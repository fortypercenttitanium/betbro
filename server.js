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

async function fetchOffensiveStats() {
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
		const statsTeamOffense = Array.from(
			dom.window.document.querySelector('#team_stats').querySelectorAll('tr')
		);
		const statsPassingOffense = Array.from(
			dom.window.document.querySelector('#passing').querySelectorAll('tr')
		);
		const statsRushingOffense = Array.from(
			dom.window.document.querySelector('#rushing').querySelectorAll('tr')
		);
		const statsConversionsOffense = Array.from(
			dom.window.document
				.querySelector('#team_conversions')
				.querySelectorAll('tr')
		);

		const allStats = compileData(
			parseArray(statsTeamOffense),
			parseArray(statsPassingOffense),
			parseArray(statsRushingOffense),
			parseArray(statsConversionsOffense)
		);

		storeStats(allStats, 'offense');
	} catch (err) {
		console.error(err);
	}
}

async function fetchDefensiveStats() {
	try {
		const data = await fetch(
			'https://www.pro-football-reference.com/years/2019/opp.htm',
			{
				method: 'GET',
			}
		);
		let text = await data.text();
		text = text.replace(/<!--|-->/gm, '');
		const dom = new JSDOM(text);
		// storeHTML(dom, 'defense');
		const statsTeamDefense = Array.from(
			dom.window.document.querySelector('#team_stats').querySelectorAll('tr')
		);
		const statsAdvancedTeamDefense = Array.from(
			dom.window.document
				.querySelector('#advanced_defense')
				.querySelectorAll('tr')
		);
		const statsPassingDefense = Array.from(
			dom.window.document.querySelector('#passing').querySelectorAll('tr')
		);
		const statsRushingDefense = Array.from(
			dom.window.document.querySelector('#rushing').querySelectorAll('tr')
		);
		const statsConversionsDefense = Array.from(
			dom.window.document
				.querySelector('#team_conversions')
				.querySelectorAll('tr')
		);

		const allStats = compileData(
			parseArray(statsTeamDefense),
			parseArray(statsAdvancedTeamDefense),
			parseArray(statsPassingDefense),
			parseArray(statsRushingDefense),
			parseArray(statsConversionsDefense)
		);

		storeStats(allStats, 'defense');
	} catch (err) {
		console.error(err);
	}
}

async function fetchOdds() {
	try {
		const oddsData = await fetch(
			`https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&apiKey=${API_KEY}`
		);
		const oddsDataJSON = await oddsData.json();
		fs.writeFile(
			path.join(__dirname, '/api/odds.json'),
			JSON.stringify(oddsDataJSON),
			(err) => {
				if (err) {
					console.error(err);
				}
			}
		);
	} catch (err) {
		if (err) {
			console.error(err);
		}
	}
}

// for testing
async function storeHTML(jsdomText, filename) {
	const filePath = `api/${filename}.html`;
	fs.writeFile(path.join(__dirname, filePath), jsdomText.serialize(), (err) => {
		if (err) {
			console.err(err);
		}
	});
}

async function storeStats(array, filename) {
	const filePath = `api/${filename}.json`;
	fs.writeFile(path.join(__dirname, filePath), JSON.stringify(array), (err) => {
		if (err) {
			console.error(err);
		}
	});
}

function parseArray(array) {
	return array
		.filter((row) => {
			return row.querySelector('th').getAttribute('data-stat') === 'ranker';
		})
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
}

function compileData(...data) {
	const newData = [];
	data.forEach((array, index) => {
		if (newData.length < 1) {
			array.forEach((item) => newData.push(item));
		} else {
			array.forEach((obj) => {
				for (let property in obj) {
					if (
						!newData[
							newData.findIndex((item) => item.team === obj.team)
						].hasOwnProperty(property)
					) {
						newData[newData.findIndex((item) => item.team === obj.team)][
							property
						] = obj[property];
					}
				}
			});
		}
	});
	return newData;
}

fetchOffensiveStats();
fetchDefensiveStats();
// fetchOdds();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/data.json', (req, res) => {
	res.sendFile(path.join(__dirname, '/api/data.json'));
});

app.listen(PORT, (req, res) => {
	console.log(`Listening on port ${PORT}`);
});
