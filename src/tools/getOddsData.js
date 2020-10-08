import getTeamIndex from './getTeamIndex';

const getOddsData = (matchups, matchup, type, site, team = null) => {
	const targetSite = matchup.betting.sites.find(
		(item) => item.site_key === site
	);
	if (targetSite && targetSite.odds[type]) {
		return type === 'moneyLine'
			? targetSite.odds[type][
					getTeamIndex(matchups, matchups.indexOf(matchup), team)
			  ] || 'n/a'
			: type === 'spreads'
			? {
					points:
						targetSite.odds[type].points[
							getTeamIndex(matchups, matchups.indexOf(matchup), team)
						] || 'n/a',
					odds:
						targetSite.odds[type].odds[
							getTeamIndex(matchups, matchups.indexOf(matchup), team)
						] || 'n/a',
			  }
			: {
					points: targetSite.odds[type].points[0] || 'n/a',
					oddsOver:
						targetSite.odds[type].odds[
							targetSite.odds[type].position.indexOf('over')
						] || 'n/a',
					oddsUnder:
						targetSite.odds[type].odds[
							targetSite.odds[type].position.indexOf('under')
						] || 'n/a',
			  };
	} else {
		return type === 'moneyLine'
			? 'n/a'
			: type === 'spreads'
			? { points: '', odds: 'n/a' }
			: { points: '', oddsOver: 'n/a', oddsUnder: 'n/a' };
	}
};

export default getOddsData;
