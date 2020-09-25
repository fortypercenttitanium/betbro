import statNameAPI from './statNameAPI';

const selectionList = Object.keys(statNameAPI.stats).map((stat) => {
	return { category: 'stats', name: stat, value: statNameAPI.stats[stat] };
});

selectionList.push({
	category: 'odds',
	name: 'moneyLine',
	value: statNameAPI.betting.moneyLine,
});
selectionList.push({
	category: 'odds',
	name: 'spreads',
	value: statNameAPI.betting.spreads,
});
selectionList.push({
	category: 'odds',
	name: 'overUnder',
	value: statNameAPI.betting.overUnder,
});

export default selectionList;
