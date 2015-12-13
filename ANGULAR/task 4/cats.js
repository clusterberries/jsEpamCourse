var fs = require('fs');
var JSON_PATH = __dirname + '/api/cats.json';

// return cats
exports.list = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.sendFile(JSON_PATH);
	console.log('Send /api/cats.json');
};

// add a new cat
exports.add = function (req, res) {
	var file = req.files.file; //img file
	var newCat = JSON.parse(req.body.data); // main info
	// create streams to copy the image to the directory 'public/img'
    var source = fs.createReadStream(file.path);
	var dest = fs.createWriteStream(__dirname + '/public/img/' + file.name);

	// copy the image
	source.pipe(dest);
	// copied successfully
	source.on('end', function() { 
		newCat.imgUrl = '/img/' + file.name;
		// read json file with cats
		fs.readFile(JSON_PATH, function(err, data) {
			if (err) {
				console.log('Failed: ' + err);
				res.status(500).send('Internal Server Error');
			}
			else {
				var cats = JSON.parse(data.toString());
				// push new cat and write new json file
				cats.push(newCat);
				// write updated json
				endResponse(cats, newCat, res);
				console.log('Add new cat ' + newCat.name + ', id: ' + newCat.id);
			}
		});
	});

	source.on('error', function(err) { 
		console.log('Failed: ' + err);
		res.status(500).send('Internal Server Error');
	});
};

//delete cat by id 
exports.delete = function (req, res) {
	var id = +req.params.id;
	fs.readFile(JSON_PATH, function(err, data) {
		if (err) {
			console.log('Failed: ' + err);
			res.status(500).send('Internal Server Error');
		}
		else {
			var cats = JSON.parse(data.toString());
			for (var i = 0; i < cats.length; ++i) {
				if (cats[i].id === id) {
					// delete the image
					deleteImg(cats[i].imgUrl);
					// delete the cat
					cats.splice(i, 1);
					break;
				}
			}
			// write new updated json
			endResponse(cats, { index: i, id: id }, res);
			console.log('Delete cat ' + i + ', id: ' + id);
		}
	});
};

// set new vote value by cat id 
exports.vote = function (req, res) {
	var id = req.body.id;
	var newValue = req.body.value;
	fs.readFile(JSON_PATH, function(err, data) {
		if (err) {
			console.log('Failed: ' + err);
			res.status(500).send('Internal Server Error');
		}
		else {
			var cats = JSON.parse(data.toString());
			for (var i = 0; i < cats.length; ++i) {
				if (cats[i].id === id) {
					cats[i].votes = newValue;
					break;
				}
			}
			// write new updated json
			endResponse(cats, {id: id}, res);
			console.log('Vote cat ' + id + ', new value ' + newValue);
		}
	});
};


// edit cat
exports.edit = function (req, res) {
	var file = req.files.file; // new img file
	var catData = JSON.parse(req.body.data); // id and name
	var source, dest;
	var cats;

	fs.readFile(JSON_PATH, function(err, data) {
		if (err) {
			console.log('Failed: ' + err);
			res.status(500).send('Internal Server Error');
		}
		else {
			cats = JSON.parse(data.toString());
			for (var i = 0; i < cats.length; ++i) {
				if (cats[i].id === catData.id) {
					cats[i].name = catData.name;
					if (file !== undefined) {
						source = fs.createReadStream(file.path);
						dest = fs.createWriteStream(__dirname + '/public/img/' + file.name);
						// copy the image
						source.pipe(dest);
						// copied successfully
						source.on('end', function() { 
							deleteImg(cats[i].imgUrl);
							cats[i].imgUrl = '/img/' + file.name;
							endResponse(cats, cats[i], res);	
							console.log('Edit cat ' + catData.id + ', new name: ' + catData.name + ', img: ' + file.name);
						});
						source.on('error', function (err) { 
							console.log('Failed: ' + err);
							res.status(500).send('Internal Server Error');
						});
					}
					else {
						endResponse(cats, cats[i], res);
						console.log('Edit cat ' + catData.id + ', new name: ' + catData.name);
					}
					break;
				}
			}
			
		}
	});
};

// write file, send response
function endResponse (cats, catsData, res) {	
	// write new updated json
	fs.writeFile(JSON_PATH, JSON.stringify(cats), 
		function (err) {
			if (err) {
				console.log('Failed: ' + err);
				res.status(500).send('Internal Server Error');
			}
			else {
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify(catsData));
			}
		}
	);
}

function deleteImg (url) {
	fs.unlink(__dirname + '/public' + url, 
		function(err) {
			if (err) {
				console.log('Deleting failed: ' + err);
			}
			else {
				console.log('Delete img ' + url);		
			}
		}
	);
} 