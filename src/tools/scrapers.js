require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const camelCase = require('./camelCaseData');
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

		return allStats;
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

		return allStats;
	} catch (err) {
		console.error(err);
	}
}

async function fetchOdds() {
	try {
		const moneyLineRaw = await fetch(
			`https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=h2h&dateFormat=iso&apiKey=${API_KEY}`
		);
		const moneyLineJSON = await moneyLineRaw.json();
		const spreadsRaw = await fetch(
			`https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=spreads&dateFormat=iso&apiKey=${API_KEY}`
		);
		const spreadsJSON = await spreadsRaw.json();
		const overUnderRaw = await fetch(
			`https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=totals&dateFormat=iso&apiKey=${API_KEY}`
		);
		const overUnderJSON = await overUnderRaw.json();

		const oddsJSON = moneyLineJSON;

		//convert h2h to moneyline
		oddsJSON.data.forEach((matchup) => {
			matchup.sites.forEach((site) => {
				site.odds.moneyLine = site.odds.h2h.map((val) => {
					if (val > 2) {
						val = (val - 1) * 100;
					} else {
						val = -100 / (val - 1);
					}
					return Math.round(val);
				});
			});
		});

		// add spreads data to moneyline
		oddsJSON.data = oddsJSON.data.map((moneyLineMatchup) => {
			const spreads = spreadsJSON.data.find((spreadsMatchup) => {
				return (
					spreadsMatchup.home_team === moneyLineMatchup.home_team &&
					spreadsMatchup.commence_time === moneyLineMatchup.commence_time
				);
			});
			if (spreads) {
				moneyLineMatchup.sites = moneyLineMatchup.sites.map((moneyLineSite) => {
					const spreadsSite = spreads.sites.find(
						(site) => site.site_key === moneyLineSite.site_key
					);
					if (spreadsSite) {
						moneyLineSite.odds.spreads = spreadsSite.odds.spreads.points;
					}
					return moneyLineSite;
				});
			}
			return moneyLineMatchup;
		});

		// add over/under data to moneyline
		oddsJSON.data = oddsJSON.data.map((moneyLineMatchup) => {
			const overUnders = overUnderJSON.data.find((overUnderMatchup) => {
				return (
					overUnderMatchup.home_team === moneyLineMatchup.home_team &&
					overUnderMatchup.commence_time === moneyLineMatchup.commence_time
				);
			});
			if (overUnders) {
				moneyLineMatchup.sites = moneyLineMatchup.sites.map((moneyLineSite) => {
					const overUnderSite = overUnders.sites.find(
						(site) => site.site_key === moneyLineSite.site_key
					);
					if (overUnderSite) {
						moneyLineSite.odds.overUnder = overUnderSite.odds.totals.points;
					}
					return moneyLineSite;
				});
			}
			return moneyLineMatchup;
		});

		fs.writeFile(
			path.join(__dirname, '../../api', 'odds.json'),
			JSON.stringify(oddsJSON),
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
	const filePath = `../../api/${filename}.html`;
	fs.writeFile(path.join(__dirname, filePath), jsdomText.serialize(), (err) => {
		if (err) {
			console.err(err);
		}
	});
}

async function storeStats(data, filename) {
	const filePath = `../../api/${filename}.json`;
	fs.writeFile(path.join(__dirname, filePath), JSON.stringify(data), (err) => {
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
				const dataType = camelCase(cell.getAttribute('data-stat'));
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

function joinStats(offense, defense) {
	return {
		offensiveStats: offense,
		defensiveStats: defense,
	};
}

async function getStats() {
	const offense = await fetchOffensiveStats();
	const defense = await fetchDefensiveStats();
	storeStats(joinStats(offense, defense), 'statsMaster');
}

module.exports = {
	getStats,
	fetchOdds,
	storeHTML,
};
