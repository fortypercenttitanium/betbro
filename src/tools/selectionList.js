import statNameAPI from './statNameAPI';

const selectionList = Object.keys(statNameAPI.stats).map((stat) => {
	return { category: 'stats', name: stat, value: statNameAPI.stats[stat] };
});

Object.keys(statNameAPI.sites).forEach((site) => {
	selectionList.push({
		category: 'odds',
		name: 'moneyLine',
		value: `MoneyLine (${statNameAPI.sites[site]})`,
		site,
	});
	selectionList.push({
		category: 'odds',
		name: 'spreads',
		value: `Spreads (${statNameAPI.sites[site]})`,
		site,
	});
	selectionList.push({
		category: 'odds',
		name: 'overUnder',
		value: `Over/Under (${statNameAPI.sites[site]})`,
		site,
	});
});

export default selectionList;
