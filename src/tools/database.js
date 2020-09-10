import moment from 'moment';

export const database = [];
const weekEndDates = {
	1: '2020-09-16',
	2: '2020-09-23',
	3: '2020-09-30',
	4: '2020-10-07',
	5: '2020-10-14',
	6: '2020-10-21',
	7: '2020-10-28',
	8: '2020-11-04',
	9: '2020-11-11',
	10: '2020-11-18',
	11: '2020-11-25',
	12: '2020-12-02',
	13: '2020-12-09',
	14: '2020-12-16',
	15: '2020-12-23',
	16: '2020-12-30',
	17: '2020-01-06',
	18: '2021-01-13',
	19: '2021-01-20',
	20: '2021-01-27',
	21: '2021-02-08',
};

const thisWeek =
	Object.values(weekEndDates).findIndex((date) => {
		return moment(date).subtract(1, 'days').isAfter(moment());
	}) + 1;

async function fetchStats() {
	try {
		const offensiveStatsRaw = await fetch(`/offense`);
		const defensiveStatsRaw = await fetch(`/defense`);
		const offensiveStats = await offensiveStatsRaw.json();
		const defensiveStats = await defensiveStatsRaw.json();
		return {
			offensiveStats,
			defensiveStats,
		};
	} catch (err) {
		console.error(err);
	}
}
async function fetchOdds(week) {
	try {
		const oddsDataRaw = await fetch('/odds');
		const odds = await oddsDataRaw.json();
		const thisWeeksOdds = odds.data.filter((game) => {
			return moment(game.commence_time).isBefore(weekEndDates[week]);
		});

		const matchups = thisWeeksOdds.map((matchup) => {
			return {
				homeTeam: matchup.home_team,
				awayTeam: matchup.teams.filter((team) => team !== matchup.homeTeam),
				time: moment(matchup.commence_time),
			};
		});
		return {
			thisWeeksOdds,
			matchups,
		};
	} catch (err) {
		console.error(err);
	}
}

export async function fillDatabase() {
	try {
		const { offensiveStats, defensiveStats } = await fetchStats();
		const odds = await fetchOdds(thisWeek);
		const matchups = odds.matchups;
		const database = matchups.map((matchup) => {
			return {
				time: matchup.time,
				home: {},
			};
		});
	} catch (err) {
		console.error(err);
	}
}

export const init = [
	{ category: 'odds', site: 'betrivers', selection: 'spread' },
	{ category: 'odds', site: 'betrivers', selection: 'moneyline' },
	{ category: 'offense', site: '', selection: 'points-for' },
	{ category: 'offense', site: '', selection: 'passing-yards-per-game' },
	{ category: 'offense', site: '', selection: 'rushing-yards-per-game' },
	{ category: 'offense', site: '', selection: 'first-downs-per-game' },
	{ category: 'offense', site: '', selection: 'redzone-efficiency' },
	{ category: 'defense', site: '', selection: 'points-against-per-game' },
	{ category: 'defense', site: '', selection: 'yards-allowed-per-game' },
	{ category: 'defense', site: '', selection: 'turnover-differential' },
];
