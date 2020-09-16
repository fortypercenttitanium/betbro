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

app.use(logger, express.static(path.join(__dirname, 'build')));

app.get('/stats', (req, res) => {
	console.log('received fetch stats');
	async function fetchStatDB() {
		const statList = await scrapers.getStats();
		res.setHeader('Content-Type', 'application/json');
		res.json(statList);
		res.end();
	}
	fetchStatDB();
});

app.get('/odds', (req, res) => {
	console.log('received fetch odds');
	async function fetchOddsDB() {
		try {
			const oddsList = await scrapers.getOdds();
			res.setHeader('Content-Type', 'application/json');
			res.json(oddsList);
			res.end();
		} catch (err) {
			console.err(err);
		}
	}
	fetchOddsDB();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
