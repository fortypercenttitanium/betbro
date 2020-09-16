require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const scrapers = require('./src/tools/scrapers');
const morgan = require('morgan');
const NodeCache = require('node-cache');

const cache = new NodeCache();

async function refreshCache() {
	try {
		const odds = await scrapers.getOdds();
		const stats = await scrapers.getStats();
		cache.set('test', odds);
		cache.mset([
			{ key: 'stats', val: stats },
			{ key: 'odds', val: odds },
		]);
		console.log('cache refreshed');
	} catch (err) {
		console.error(err);
	}
}

refreshCache();
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
	res.setHeader('Content-Type', 'application/json');
	res.json(JSON.stringify(cache.get('stats')));
	res.end();
});

app.get('/odds', (req, res) => {
	console.log('received fetch odds');
	res.setHeader('Content-Type', 'application/json');
	res.json(cache.get('odds'));
	res.end();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
