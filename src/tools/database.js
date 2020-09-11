export default async function fetchStats(team, statList) {
	try {
		const offensiveStatsRaw = await fetch(`/offense`);
		const defensiveStatsRaw = await fetch(`/defense`);
		const offensiveStats = await offensiveStatsRaw.json();
		const defensiveStats = await defensiveStatsRaw.json();

		const OS = offensiveStats.find((item) => item.team === team);
		const DS = defensiveStats.find((item) => item.team === team);

		Object.keys(OS).forEach((key) => {
			if (/^[0-9.-]*$/.test(OS[key])) {
				OS[key] = Number(OS[key]);
			}
		});
		Object.keys(DS).forEach((key) => {
			if (/^[0-9.-]*$/.test(DS[key])) {
				DS[key] = Number(DS[key]);
			}
		});

		const result = {
			team,
		};

		statList.forEach((stat) => {
			if (stat.category === 'stats') {
				result[stat.selection] = calcStat(stat.selection);
			}
		});

		return result;

		function calcStat(stat) {
			switch (stat) {
				case 'gamesPlayed':
					return OS.g;
				case 'pointsForPG':
					return OS.points / OS.g;
				case 'totalYardsOffensePG':
					return OS.totalYards / OS.g;
				case 'offensivePlaysPG':
					return OS.playsOffense / OS.g;
				case 'offensiveYardsPP':
					return OS.ydsPerPlayOffense;
				case 'offensiveTurnoversPG':
					return OS.turnovers / OS.g;
				case 'fumblesLostPG':
					return OS.fumblesLost / OS.g;
				case 'firstDownsPG':
					return OS.firstDown / OS.g;
				case 'passCompPG':
					return OS.passCmp / OS.g;
				case 'passAttPG':
					return OS.passAtt / OS.g;
				case 'passYdsPG':
					return OS.passYdsPerG;
				case 'passTdPG':
					return OS.passTd / OS.g;
				case 'offensiveIntPG':
					return OS.passInt / OS.g;
				case 'passYdsPerAtt':
					return OS.passYdsPerAtt;
				case 'passFirstDownsPG':
					return OS.passFd / OS.g;
				case 'rushAttPG':
					return OS.rushAtt / OS.g;
				case 'rushYdsPG':
					return OS.rushYdsPerG;
				case 'rushTdPG':
					return OS.rushTd / OS.g;
				case 'rushYdsPerAtt':
					return OS.rushYdsPerAtt;
				case 'rushFirstDownsPG':
					return OS.rushFd / OS.g;
				case 'offensivePenaltiesPG':
					return OS.penalties / OS.g;
				case 'offensivePenaltyYdsPG':
					return OS.penaltiesYds / OS.g;
				case 'scoringPctFor':
					return OS.scorePct;
				case 'offensiveTurnoverPct':
					return OS.turnoverPct;
				case 'passCompPct':
					return OS.passCmpPerc;
				case 'passTouchdownPct':
					return OS.passTdPerc;
				case 'passIntPct':
					return OS.passIntPerc;
				case 'passLong':
					return OS.passLong;
				case 'passYdsPerComp':
					return OS.passYdsPerComp;
				case 'passRating':
					return OS.passRating;
				case 'sacksAllowed':
					return OS.passSacked;
				case 'sacksAllowedYds':
					return OS.passSackedYds;
				case 'sackPct':
					return OS.passSackedPerc;
				case 'comebacks':
					return OS.comebacks;
				case 'gwd':
					return OS.gwd;
				case 'rushLong':
					return OS.rushLong;
				case 'fumblesAllowed':
					return OS.fumbles;
				case 'thirdDownPct':
					return OS.thirdDownPct;
				case 'fourthDownPct':
					return OS.fourthDownPct;
				case 'redzonePct':
					return OS.redZonePct;
				default:
					return null;
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export const initialSelections = [
	{ category: 'odds', site: 'betrivers', selection: 'spread' },
	{ category: 'odds', site: 'betrivers', selection: 'moneyline' },
	{ category: 'stats', selection: 'pointsForPG' },
	{ category: 'stats', selection: 'passYdsPG' },
	{ category: 'stats', selection: 'rushYdsPG' },
	{ category: 'stats', selection: 'firstDownsPG' },
	{ category: 'stats', selection: 'passCompPct' },
	{ category: 'stats', selection: 'scoringPctFor' },
	{ category: 'stats', selection: 'offensiveTurnoversPG' },
	{ category: 'stats', selection: 'redzonePct' },
];
