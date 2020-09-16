require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const scrapers = require('./src/tools/scrapers');
const morgan = require('morgan');

scrapers.getStats();
scrapers.fetchOdds();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'logger.log'),
	{ flags: 'a' }
);

// setup the logger
const logger = morgan('combined', { stream: accessLogStream });

app.get('/fetchStats', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/statsMaster.json'));
});

app.get('/odds', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/odds.json'));
});

app.use(logger, express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
