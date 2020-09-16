require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const scrapers = require('./src/tools/scrapers');
const morgan = require('morgan');

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'logger.log'),
	{ flags: 'a' }
);

// setup the logger
const logger = morgan('combined', { stream: accessLogStream });

let stats = {};
let odds = {};
(async function fetchStatDB() {
	const statList = await scrapers.getStats();
	stats = statList;
})();
(async function fetchOddsDB() {
	const oddsList = await scrapers.getOdds();
	odds = oddsList;
})();

app.get('/stats', (req, res) => {
	console.log('received fetch stats');
	res.setHeader('Content-Type', 'application/json');
	res.send('hello');
	res.end();
});

app.get('/odds', (req, res) => {
	'received fetch odds';
	res.setHeader('Content-Type', 'application/json');
	res.json(odds);
	res.end();
});
app.use(logger, express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
