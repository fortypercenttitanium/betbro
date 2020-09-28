export default async function fetchStats(statList) {
	try {
		const key = process.env.hasOwnProperty('REACT_APP_API_KEY')
			? process.env.REACT_APP_API_KEY
			: process.env.API_KEY;
		const statsDataRaw = await fetch(
			process.env.NODE_ENV === 'development'
				? '/stats'
				: process.env.hasOwnProperty('REACT_APP_API_URL')
				? `${process.env.REACT_APP_API_URL}/stats`
				: `${process.env.API_URL}/stats`,
			{
				method: 'POST',
				headers: {
					authorization: `Basic ${key}`,
				},
			}
		);
		if (!statsDataRaw.ok) {
			throw new Error(statsDataRaw.status + ': ' + statsDataRaw.statusText);
		}

		const statsJSON = await statsDataRaw.json();
		const stats = await JSON.parse(statsJSON);
		const OS = stats.offensiveStats;
		const DS = stats.defensiveStats;

		//convert to numbers
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

		const result = [];

		// initialize objects with teams
		OS.forEach((item) => {
			if (item.team !== '') {
				result.push({ team: item.team });
			}
		});

		// set records
		const records = {};
		result.forEach((result) => {
			if (
				result.team !== 'Avg Tm/G' &&
				result.team !== 'League Total' &&
				result.team !== 'Avg Team'
			) {
				records[result.team] = OS.find(
					(stat) => stat.team === result.team
				).record;
			}
		});

		// add in rest of stats
		result.map((obj) => {
			statList.forEach((stat) => {
				if (stat.category === 'stats') {
					typeof calcStat(stat.name, obj.team) === 'number'
						? (obj[stat.name] =
								Math.round(calcStat(stat.name, obj.team) * 10) / 10)
						: (obj[stat.name] = calcStat(stat.name, obj.team));
				}
			});
			return obj;
		});

		return { result, records };

		// parse data with team name
		function findTeamStats(team, data) {
			return data.find((item) => item.team === team);
		}

		// unify stat naming API
		function calcStat(stat, team) {
			switch (stat) {
				case 'gamesPlayed':
					return findTeamStats(team, OS).g;
				case 'pointsForPG':
					return findTeamStats(team, OS).points / findTeamStats(team, OS).g;
				case 'totalYardsOffensePG':
					return findTeamStats(team, OS).totalYards / findTeamStats(team, OS).g;
				case 'offensivePlaysPG':
					return (
						findTeamStats(team, OS).playsOffense / findTeamStats(team, OS).g
					);
				case 'offensiveYardsPP':
					return findTeamStats(team, OS).ydsPerPlayOffense;
				case 'offensiveTurnoversPG':
					return findTeamStats(team, OS).turnovers / findTeamStats(team, OS).g;
				case 'fumblesLostPG':
					return (
						findTeamStats(team, OS).fumblesLost / findTeamStats(team, OS).g
					);
				case 'firstDownsPG':
					return findTeamStats(team, OS).firstDown / findTeamStats(team, OS).g;
				case 'passCompPG':
					return findTeamStats(team, OS).passCmp / findTeamStats(team, OS).g;
				case 'passAttPG':
					return findTeamStats(team, OS).passAtt / findTeamStats(team, OS).g;
				case 'passYdsPG':
					return findTeamStats(team, OS).passYdsPerG;
				case 'passTdPG':
					return findTeamStats(team, OS).passTd / findTeamStats(team, OS).g;
				case 'offensiveIntPG':
					return findTeamStats(team, OS).passInt / findTeamStats(team, OS).g;
				case 'passYdsPerAtt':
					return findTeamStats(team, OS).passYdsPerAtt;
				case 'passFirstDownsPG':
					return findTeamStats(team, OS).passFd / findTeamStats(team, OS).g;
				case 'rushAttPG':
					return findTeamStats(team, OS).rushAtt / findTeamStats(team, OS).g;
				case 'rushYdsPG':
					return findTeamStats(team, OS).rushYdsPerG;
				case 'rushTdPG':
					return findTeamStats(team, OS).rushTd / findTeamStats(team, OS).g;
				case 'rushYdsPerAtt':
					return findTeamStats(team, OS).rushYdsPerAtt;
				case 'rushFirstDownsPG':
					return findTeamStats(team, OS).rushFd / findTeamStats(team, OS).g;
				case 'offensivePenaltiesPG':
					return findTeamStats(team, OS).penalties / findTeamStats(team, OS).g;
				case 'offensivePenaltyYdsPG':
					return (
						findTeamStats(team, OS).penaltiesYds / findTeamStats(team, OS).g
					);
				case 'scoringPctFor':
					return findTeamStats(team, OS).scorePct;
				case 'offensiveTurnoverPct':
					return findTeamStats(team, OS).turnoverPct;
				case 'passCompPct':
					return findTeamStats(team, OS).passCmpPerc;
				case 'passTouchdownPct':
					return findTeamStats(team, OS).passTdPerc;
				case 'passIntPct':
					return findTeamStats(team, OS).passIntPerc;
				case 'passLong':
					return findTeamStats(team, OS).passLong;
				case 'passYdsPerComp':
					return findTeamStats(team, OS).passYdsPerComp;
				case 'passRating':
					return findTeamStats(team, OS).passRating;
				case 'sacksAllowed':
					return findTeamStats(team, OS).passSacked;
				case 'sacksAllowedYds':
					return findTeamStats(team, OS).passSackedYds;
				case 'sackPctOff':
					return findTeamStats(team, OS).passSackedPerc;
				case 'comebacks':
					return findTeamStats(team, OS).comebacks;
				case 'gwd':
					return findTeamStats(team, OS).gwd;
				case 'rushLong':
					return findTeamStats(team, OS).rushLong;
				case 'fumblesAllowed':
					return findTeamStats(team, OS).fumbles;
				case 'thirdDownPct':
					return findTeamStats(team, OS).thirdDownPct;
				case 'fourthDownPct':
					return findTeamStats(team, OS).fourthDownPct;
				case 'redzonePct':
					return findTeamStats(team, OS).redZonePct;
				case 'record':
					return findTeamStats(team, OS).record;
				case 'turnoverDiff':
					return (
						findTeamStats(team, DS).turnovers -
						findTeamStats(team, OS).turnovers
					);
				case 'pointDiff':
					return (
						findTeamStats(team, OS).points - findTeamStats(team, DS).points
					);
				case 'pointsAgPG':
					return findTeamStats(team, DS).points / findTeamStats(team, OS).g;
				case 'yardsAllowedPG':
					return findTeamStats(team, DS).totalYards / findTeamStats(team, OS).g;
				case 'defensivePlaysPG':
					return (
						findTeamStats(team, DS).playsOffense / findTeamStats(team, OS).g
					);
				case 'yardsAllowedPP':
					return findTeamStats(team, DS).ydsPerPlayOffense;
				case 'defensiveTurnoversPG':
					return findTeamStats(team, DS).turnovers / findTeamStats(team, OS).g;
				case 'forcedFumblesPG':
					return (
						findTeamStats(team, DS).fumblesLost / findTeamStats(team, OS).g
					);
				case 'firstDownsAllowedPG':
					return findTeamStats(team, DS).firstDown / findTeamStats(team, OS).g;
				case 'passCompAllowedPG':
					return findTeamStats(team, DS).passCmp / findTeamStats(team, OS).g;
				case 'passAttAgPG':
					return findTeamStats(team, DS).passAtt / findTeamStats(team, OS).g;
				case 'passTdAllowedPG':
					return findTeamStats(team, DS).passTd / findTeamStats(team, OS).g;
				case 'defensiveIntPG':
					return findTeamStats(team, DS).passInt / findTeamStats(team, OS).g;
				case 'passYdsPerAttAg':
					return findTeamStats(team, DS).passYdsPerAtt;
				case 'passFistDownsAllowedPG':
					return findTeamStats(team, DS).passFd / findTeamStats(team, OS).g;
				case 'rushAttAgPG':
					return findTeamStats(team, DS).rushAtt / findTeamStats(team, OS).g;
				case 'rushYdsAllowedPG':
					return findTeamStats(team, DS).rushYdsPerG;
				case 'rushTdAllowedPG':
					return findTeamStats(team, DS).rushTd / findTeamStats(team, OS).g;
				case 'rushYdsPerAttAg':
					return findTeamStats(team, DS).rushYdsPerAtt;
				case 'rushFirstDownsAllowedPG':
					return findTeamStats(team, DS).rushFd / findTeamStats(team, OS).g;
				case 'defensivePenaltiesPG':
					return findTeamStats(team, DS).penalties / findTeamStats(team, OS).g;
				case 'defensivePenaltyYdsPG':
					return (
						findTeamStats(team, DS).penaltiesYds / findTeamStats(team, OS).g
					);
				case 'scoringPctAg':
					return findTeamStats(team, DS).scorePct;
				case 'defensiveTurnoverPct':
					return findTeamStats(team, DS).turnoverPct;
				case 'passCompPctAllowed':
					return findTeamStats(team, DS).passCompPct;
				case 'passTdPctAg':
					return findTeamStats(team, DS).passTdPerc;
				case 'passesDefensedPG':
					return (
						findTeamStats(team, DS).passDefended / findTeamStats(team, OS).g
					);
				case 'defIntPct':
					return findTeamStats(team, DS).passIntPerc;
				case 'passYardsPerAttAg':
					return findTeamStats(team, DS).passYdsPerAtt;
				case 'passYardsPerCompAllowed':
					return findTeamStats(team, DS).passYdsPerCmp;
				case 'passRatingAg':
					return findTeamStats(team, DS).passRating;
				case 'sacksPG':
					return findTeamStats(team, DS).passSacked / findTeamStats(team, OS).g;
				case 'sackYdsPG':
					return (
						findTeamStats(team, DS).passSackedYds / findTeamStats(team, OS).g
					);
				case 'qbHitsPG':
					return findTeamStats(team, DS).qbHits / findTeamStats(team, OS).g;
				case 'tacklesForLossPG':
					return (
						findTeamStats(team, DS).tacklesLoss / findTeamStats(team, OS).g
					);
				case 'sackPctDef':
					return findTeamStats(team, DS).passSackedPerc;
				case 'passYdsPGAllowed':
					return findTeamStats(team, DS).passYdsPerG;
				case 'thirdDownPctAg':
					return findTeamStats(team, DS).thirdDownPct;
				case 'fourthDownPctAg':
					return findTeamStats(team, DS).fourthDownPct;
				case 'redzonePctAg':
					return findTeamStats(team, DS).redZonePct;
				default:
					return null;
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export const initialSelections = [
	0,
	81,
	82,
	83,
	2,
	3,
	17,
	11,
	41,
	44,
	47,
	50,
	52,
];
