import React from 'react';
import { StatCell } from '../../sharedStyles';
import ComparisonGauge from '../../ComparisonGauge';

function StatsCell({
  row,
  column,
  matchup,
  selection,
  awayTeamStats,
  homeTeamStats,
}) {
  const { home_team, away_team } = matchup;

  const statCategory = selection.category.toLowerCase();
  const homeRank = Number(homeTeamStats[statCategory][selection.name].rank);
  const awayRank = Number(awayTeamStats[statCategory][selection.name].rank);
  const homeValue = homeTeamStats[statCategory][selection.name].value;
  const awayValue = awayTeamStats[statCategory][selection.name].value;

  return (
    <StatCell
      style={{ gridRowStart: row, gridColumnStart: column }}
      row={row}
      column={column}
    >
      <div className="stats">
        <p>{awayValue}</p>
      </div>
      <div className="stats">
        <p>{homeValue}</p>
      </div>
      <div className="gauge-container">
        <ComparisonGauge
          homeTeam={home_team}
          awayTeam={away_team}
          awayRank={awayRank}
          homeRank={homeRank}
        />
      </div>
    </StatCell>
  );
}

export default StatsCell;
