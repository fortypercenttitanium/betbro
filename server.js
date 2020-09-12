require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const scrapers = require('./src/tools/scrapers');

scrapers.getStats();
scrapers.fetchOdds();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/fetchStats', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/statsMaster.json'));
});

app.get('/odds', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/odds.json'));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
