export default function ranker(statsList, stat) {
	const orderedStatList = statsList
		.map((item) => {
			return { team: item.team, [stat]: item[stat] };
		})
		.sort(sorter)
		.map((item, index) => {
			item.rank = index + 1;
			return item;
		});

	orderedStatList.forEach((item, index, arr) => {
		if (index > 0 && item[stat] === arr[index - 1][stat]) {
			item.rank = arr[index - 1].rank;
		}
	});

	return orderedStatList;

	function sorter(item1, item2) {
		const a = item1[stat];
		const b = item2[stat];
		switch (stat) {
			case 'record':
				return Number(a.split(' ')[0]) > Number(b.split(' ')[0])
					? -1
					: Number(a.split(' ')[0]) < Number(b.split(' ')[0])
					? 1
					: 0;
			case 'gamesPlayed':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'pointsForPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'totalYardsOffensePG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensivePlaysPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensiveYardsPP':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensiveTurnoversPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'fumblesLostPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'firstDownsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passCompPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passAttPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passYdsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passTdPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensiveIntPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passYdsPerAtt':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passFirstDownsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushAttPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushYdsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushTdPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushYdsPerAtt':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushFirstDownsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensivePenaltiesPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'offensivePenaltyYdsPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'scoringPctFor':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'offensiveTurnoverPct':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passCompPct':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passTouchdownPct':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passIntPct':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passLong':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passYdsPerComp':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passRating':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'sacksAllowed':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'sacksAllowedYds':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'sackPctOff':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'comebacks':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'gwd':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'rushLong':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'fumblesAllowed':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'thirdDownPct':
				return Number(a.slice(0, a.length - 1)) >
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) < Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			case 'fourthDownPct':
				return Number(a.slice(0, a.length - 1)) >
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) < Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			case 'redzonePct':
				return Number(a.slice(0, a.length - 1)) >
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) < Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			case 'turnoverDiff':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'pointDiff':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'pointsAgPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'yardsAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensivePlaysPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'yardsAllowedPP':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensiveTurnoversPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'forcedFumblesPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'firstDownsAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passCompAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passAttAgPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passTdAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensiveIntPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passYdsPerAttAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passFistDownsAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'rushAttAgPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'rushYdsAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'rushTdAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'rushYdsPerAttAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'rushFirstDownsAllowedPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensivePenaltiesPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensivePenaltyYdsPG':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'scoringPctAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'defensiveTurnoverPct':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passCompPctAllowed':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passTdPctAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passesDefensedPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'defIntPct':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passYardsPerAttAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passYardsPerCompAllowed':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'passRatingAg':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'sacksPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'sackYdsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'qbHitsPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'tacklesForLossPG':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'sackPctDef':
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
			case 'passYdsPGAllowed':
				return Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
			case 'thirdDownPctAg':
				return Number(a.slice(0, a.length - 1)) <
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) > Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			case 'fourthDownPctAg':
				return Number(a.slice(0, a.length - 1)) <
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) > Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			case 'redzonePctAg':
				return Number(a.slice(0, a.length - 1)) <
					Number(b.slice(0, b.length - 1))
					? -1
					: Number(a.slice(0, a.length - 1)) > Number(b.slice(0, b.length - 1))
					? 1
					: 0;
			default:
				return Number(a) > Number(b) ? -1 : Number(a) < Number(b) ? 1 : 0;
		}
	}
}
