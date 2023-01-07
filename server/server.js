const express = require('express');
const path = require('path');
const fs = require('fs');
const { Midi } = require('@tonejs/midi')

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(require('body-parser').raw());

app.set('views', path.join(__dirname, '..', 'public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
	res.status(200);
	res.set('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/midi', (req, res) => {
	fs.existsSync(path.join(__dirname, 'midis')) || fs.mkdirSync(path.join(__dirname, 'midis'));
	fs.readdir(path.join(__dirname, 'midis'), (err, files) => {
		if (err) {
			console.error(err);
			return;
		}

		const fileCount = files.filter((file) => {
			return fs.statSync(path.join(__dirname, 'midis', file)).isFile();
		}).length;
		const id = (fileCount + 1).toString();

		fs.writeFile(path.join(__dirname, 'midis', `${id}.mid`), req.body, (err) => { if (err) console.error(err); });
		res.send({ id: id });
	});
});

app.get('/visualization/:id', (req, res) => {
	res.status(200);
	res.render('visualization', { data: new Midi(fs.readFileSync(path.join(__dirname, 'midis', `${req.params.id}.mid`))) });
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});

