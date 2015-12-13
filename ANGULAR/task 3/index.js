var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cats = require('./cats.js');

// need this to upload images
var multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/cats.json', cats.list);
app.post('/api/add_cat', multipartyMiddleware, cats.add);
app.get('/api/delete_cat/:id', cats.delete);
app.post('/api/vote_cat', cats.vote);
app.post('/api/edit_cat', multipartyMiddleware, cats.edit);


app.listen(3000);
console.log('Server is running on port 3000');
