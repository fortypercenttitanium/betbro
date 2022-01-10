import deCamelCase from '../deCamelCase';

function selectionList(stats) {
  const teams = Object.keys(stats).filter(
    (team) => !['Avg Tm/G', 'League Total', 'Avg Team'].includes(team),
  );

  const list = [];

  // Push offensive stats into list
  Object.keys(stats[teams[0]].offense).forEach((oStat) => {
    if (oStat === 'team' || oStat === 'g') return;

    if (teams.every((team) => stats[team].offense.hasOwnProperty(oStat))) {
      list.push({
        category: 'Offense',
        name: oStat,
        value: deCamelCase(oStat),
      });
    }
  });

  // Push defensive stats into list
  Object.keys(stats[teams[0]].defense).forEach((dStat) => {
    if (dStat === 'team' || dStat === 'g') return;

    if (teams.every((team) => stats[team].defense.hasOwnProperty(dStat))) {
      list.push({
        category: 'Defense',
        name: dStat,
        value: deCamelCase(dStat),
      });
    }
  });

  // Push differential stats into list
  Object.keys(stats[teams[0]].differentials).forEach((diffStat) => {
    if (
      teams.every((team) => stats[team].differentials.hasOwnProperty(diffStat))
    ) {
      list.push({
        category: 'Differentials',
        name: diffStat,
        value: deCamelCase(diffStat),
      });
    }
  });

  list.push({
    category: 'Games',
    name: 'g',
    value: 'Games',
  });
  list.push({
    category: 'Record',
    name: 'record',
    value: 'Record',
  });
  list.push({
    category: 'Odds',
    name: 'moneyLine',
    value: 'Moneyline',
  });
  list.push({
    category: 'Odds',
    name: 'spreads',
    value: 'Spread',
  });
  list.push({
    category: 'Odds',
    name: 'overUnder',
    value: 'Over/Under',
  });

  return list;
}

export default selectionList;
