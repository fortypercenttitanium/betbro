import React from 'react';
import {
  StatsCell,
  OverUnderCell,
  SpreadsCell,
  MoneyLineCell,
} from '../grid/cells/cells';

// Higher-order component to render the cell with the correct styling and data
function TileCellType({
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

export default TileCellType;
