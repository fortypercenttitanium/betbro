require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const API_KEY = process.env.API_KEY;

async function fetchData() {
	//
	try {
		const data = await fetch(
			`https://www.pro-football-reference.com/years/2019/`,
			{
				method: 'GET',
			}
		);
		let text = await data.text();
		text = text.replace(/<!--|-->/gm, '');
		const dom = new JSDOM(text);
		const statsOffense = dom.window.document.querySelector('#all_team_stats');
		let offStatsArray = Array.from(statsOffense.querySelectorAll('tr'));
		offStatsArray = offStatsArray.filter((row) => {
			return row.querySelector('th').getAttribute('data-stat') === 'ranker';
		});
		offStatsArray = offStatsArray
			.map((row) => {
				const cells = row.querySelectorAll('td');
				const obj = {};
				cells.forEach((cell, i) => {
					const dataType = cell.getAttribute('data-stat');
					obj[dataType] =
						dataType === 'team'
							? cell.childNodes[0].textContent
							: (obj[dataType] = cell.textContent);
				});
				return obj;
			})
			.filter((obj) => Object.keys(obj).length > 0);
		fs.writeFile(
			path.join(__dirname, 'api/data.json'),
			JSON.stringify(offStatsArray),
			(err) => {
				if (err) {
					console.error(err);
				}
			}
		);
	} catch (err) {
		console.error(err);
	}
}

fetchData();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/data.json', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/data.json'));
});

app.listen(PORT, (req, res) => {
	console.log(`Listening on port ${PORT}`);
});
