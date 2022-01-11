import React from 'react';

import {
  StatsCell,
  OverUnderCell,
  SpreadsCell,
  MoneyLineCell,
} from './cells/cells';

// Higher-order component to render the cell with the correct styling and data
function StatCellType({
  row,
  matchup,
  column,
  selection,
  homeTeamStats,
  awayTeamStats,
  sportsbook,
}) {
  switch (selection.name) {
    case 'spreads':
      return (
        <SpreadsCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    case 'moneyLine':
      return (
        <MoneyLineCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    case 'overUnder':
      return (
        <OverUnderCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    default:
      return (
        <StatsCell
          row={row}
          matchup={matchup}
          column={column}
          selection={selection}
          homeTeamStats={homeTeamStats}
          awayTeamStats={awayTeamStats}
        />
      );
  }
}

export default function GridBody({
  matchups,
  statSelections,
  stats,
  sportsbook,
}) {
  const gridRender = matchups.map((matchup, column) => {
    const { home_team, away_team } = matchup;
    const homeTeamStats = stats[home_team];
    const awayTeamStats = stats[away_team];

    return statSelections.map((selection, row) => (
      <StatCellType
        key={`${row} - ${selection.category}: ${selection.name}`}
        row={row}
        matchup={matchup}
        column={column}
        selection={selection}
        homeTeamStats={homeTeamStats}
        awayTeamStats={awayTeamStats}
        sportsbook={sportsbook}
      />
    ));
  });

  return gridRender;
}
