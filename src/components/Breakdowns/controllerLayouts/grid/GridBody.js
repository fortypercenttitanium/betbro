import React from 'react';
import GridCellType from './GridCellType';

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
      <GridCellType
        key={`${row} - ${selection.category}: ${selection.name}`}
        row={row + 2}
        matchup={matchup}
        column={column + 2}
        selection={selection}
        homeTeamStats={homeTeamStats}
        awayTeamStats={awayTeamStats}
        sportsbook={sportsbook}
      />
    ));
  });

  return gridRender;
}
