require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const camelCase = require('./camelCaseData');
const jsdom = require('jsdom');
const moment = require('moment');
const { JSDOM } = jsdom;
const API_KEY = process.env.API_KEY;
const weeks = require('./weeks');

async function fetchOffensiveStats() {
	try {
		const data = await fetch(
			// `https://www.pro-football-reference.com/years/2019/`,
			'https://www.pro-football-reference.com/years/2020//index.htm',
			{
				method: 'GET',
			}
		);
		let text = await data.text();
		text = text.replace(/<!--|-->/gm, '');
		const dom = new JSDOM(text);
		const statsRecordsAFC = Array.from(
			dom.window.document.querySelector('#AFC').querySelectorAll('tr')
		);
		const statsRecordsNFC = Array.from(
			dom.window.document.querySelector('#NFC').querySelectorAll('tr')
		);
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

		const records = [
			...parseRecords(statsRecordsAFC),
			...parseRecords(statsRecordsNFC),
		];

		const allStats = compileData(
			parseArray(statsTeamOffense),
			parseArray(statsPassingOffense),
			parseArray(statsRushingOffense),
			parseArray(statsConversionsOffense)
		);

		//add record data

		records.forEach((record) => {
			const teamIndex = allStats.findIndex((stat) => stat.team === record.team);
			if (teamIndex >= 0) {
				allStats[teamIndex].record = record.record;
			}
		});

		return allStats;
	} catch (err) {
		console.error(err);
	}
}

async function fetchDefensiveStats() {
	try {
		const data = await fetch(
			// 'https://www.pro-football-reference.com/years/2019/opp.htm',
			'https://www.pro-football-reference.com/years/2020/opp.htm',
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

// for testing
async function storeHTML(jsdomText, filename) {
	const filePath = `../../api/${filename}.html`;
	fs.writeFile(path.join(__dirname, filePath), jsdomText.serialize(), (err) => {
		if (err) {
			console.err(err);
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
						: cell.textContent !== ''
						? (obj[dataType] = cell.textContent)
						: (obj[dataType] = '0');
			});
			return obj;
		})
		.filter((obj) => Object.keys(obj).length > 0);
}

function parseRecords(array) {
	return array
		.filter((row) => row.querySelector('th') !== null)
		.filter((row) => {
			return row.querySelector('th').getAttribute('data-stat') === 'team';
		})
		.map((row) => {
			const cells = Array.from(row.querySelectorAll('td')).filter(
				(td) =>
					td.getAttribute('data-stat') === 'wins' ||
					td.getAttribute('data-stat') === 'losses' ||
					td.getAttribute('data-stat') === 'ties'
			);
			const team = row.querySelector('th').childNodes[0].textContent;
			const obj = { team };
			cells.forEach((cell, i) => {
				const dataType = cell.getAttribute('data-stat');
				obj[dataType] =
					cell.textContent !== ''
						? (obj[dataType] = cell.textContent)
						: (obj[dataType] = '0');
			});
			return obj;
		})
		.filter((obj) => Object.values(obj).length > 2)
		.map((obj) => {
			return {
				team: obj.team,
				record: obj.ties
					? `${obj.wins} - ${obj.losses} - ${obj.ties}`
					: `${obj.wins} - ${obj.losses}`,
			};
		});
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
	const stats = {
		offensiveStats: offense,
		defensiveStats: defense,
		// add timestamp
		lastUpdated: moment().toISOString(),
	};
	return stats;
}

async function getStats() {
	try {
		const offense = await fetchOffensiveStats();
		const defense = await fetchDefensiveStats();
		return joinStats(offense, defense);
	} catch (err) {
		console.error(err);
	}
}

async function getOdds() {
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
					const mlString =
						Math.round(val) > 0
							? `+${Math.round(val)}`
							: Math.round(val).toString();
					return mlString;
				});
			});
		});

		// add week
		oddsJSON.data = oddsJSON.data.map((datum) => {
			const weekNumber =
				Object.values(weeks.weekEndDates).findIndex((week) =>
					moment(week).isAfter(moment(datum.commence_time))
				) + 1;
			datum.week = weekNumber;
			return datum;
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
						moneyLineSite.odds.spreads = spreadsSite.odds.spreads.points.map(
							(point) => {
								return Number(point) > 0 ? `+${point}` : point;
							}
						);
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

		// check if any odds data was deleted from last pull and add it back in

		// const oldOdds = JSON.parse(
		// 	fs.readFileSync(path.join(__dirname, '../../api/odds.json'), 'utf8')
		// );
		// oldOdds.data.forEach((matchupOld, index) => {
		// 	//find the same matchup in the old data
		// 	const i = oddsJSON.data.findIndex(
		// 		(matchupNew) =>
		// 			matchupNew.week === matchupOld.week &&
		// 			matchupNew.home_team === matchupOld.home_team
		// 	);
		// 	// in case it wasn't found
		// 	if (i >= 0) {
		// 		// check each old matchup for sites not in the new one, and push them if they aren't there
		// 		matchupOld.sites.forEach((site) => {
		// 			if (
		// 				!oddsJSON.data[i].sites.find(
		// 					(newList) => newList.site_key === site.site_key
		// 				)
		// 			) {
		// 				site.deleted = true;
		// 				oddsJSON.data[i].sites.push(site);
		// 			}
		// 		});
		// 	} else {
		// 		console.log('matchup comparison not found (line 200)');
		// 	}
		// });

		//add timestamp
		oddsJSON.lastUpdated = moment().toISOString();
		return oddsJSON;
	} catch (err) {
		if (err) {
			console.error(err);
		}
	}
}

module.exports = {
	getStats,
	getOdds,
	storeHTML,
};
