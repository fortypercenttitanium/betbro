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

//setup cache refresh
async function refreshStats() {
	try {
		const stats = await scrapers.getStats();
		cache.set('stats', stats);
		console.log('stats refreshed');
	} catch (err) {
		console.error(err);
	}
}
async function refreshOdds() {
	try {
		const odds = await scrapers.getOdds();
		cache.set('odds', odds);
		console.log('odds refreshed');
	} catch (err) {
		console.error(err);
	}
}

refreshStats();
refreshOdds();

//setup cache refresh timer 10 mins
setInterval(() => {
	refreshStats();
	refreshOdds();
}, 600000);

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'logger.log'),
	{ flags: 'a' }
);

// setup the logger
const logger = morgan('combined', { stream: accessLogStream });

app.use(logger, express.static(path.join(__dirname, 'build')));

async function waitForCache(name) {
	return new Promise((res, rej) => {
		if (!cache.get(name)) {
			const interval = setInterval(() => {
				if (!cache.get(name)) {
					console.log('trying to fetch ', name);
				} else {
					clearInterval(interval);
					res(cache.get(name));
				}
			}, 1000);
		} else {
			res(cache.get(name));
		}
	});
}

app.get('/stats', async (req, res) => {
	console.log('received fetch stats');
	const stats = await waitForCache('stats');
	res.setHeader('Content-Type', 'application/json');
	res.json(JSON.stringify(stats));
	res.end();
});

app.get('/odds', async (req, res) => {
	console.log('received fetch odds');
	const odds = await waitForCache('odds');
	res.setHeader('Content-Type', 'application/json');
	res.json(JSON.stringify(odds));
	res.end();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
