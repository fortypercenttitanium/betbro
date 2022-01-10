import React from 'react';
import { GridCell } from '../../sharedStyles';

function SpreadsCell({ row, column, matchup, selection, sportsbook }) {
  const homeTeamIndex = matchup.teams.indexOf(matchup.home_team);
  const awayTeamIndex = matchup.teams.indexOf(matchup.away_team);

  const selectedData = matchup[selection].find(
    (site) => site.site_key === sportsbook,
  );

  const homeOdds = selectedData?.data.odds[homeTeamIndex] || 'n/a';
  const awayOdds = selectedData?.data.odds[awayTeamIndex] || 'n/a';
  const homePoints = selectedData?.data.points[homeTeamIndex] || 'n/a';
  const awayPoints = selectedData?.data.points[awayTeamIndex] || 'n/a';

  return (
    <GridCell
      style={{ gridRowStart: row + 2, gridColumnStart: column + 2 }}
      row={row}
      column={column}
    >
      <div className="odds">
        <p>{awayPoints}</p>
        <p>({awayOdds})</p>
      </div>
      <div className="odds">
        <p>{homePoints}</p>
        <p>({homeOdds})</p>
      </div>
    </GridCell>
  );
}

export default SpreadsCell;
