import React from 'react';
import { GridCell } from '../../sharedStyles';

function MoneyLineCell({ row, column, matchup, selection, sportsbook }) {
  const homeTeamIndex = matchup.teams.indexOf(matchup.home_team);
  const awayTeamIndex = matchup.teams.indexOf(matchup.away_team);

  const homeOdds =
    matchup[selection].find((site) => site.site_key === sportsbook)?.data.odds[
      homeTeamIndex
    ] || 'n/a';

  const awayOdds =
    matchup[selection].find((site) => site.site_key === sportsbook)?.data.odds[
      awayTeamIndex
    ] || 'n/a';

  return (
    <GridCell
      style={{
        gridRowStart: row + 2,
        gridColumnStart: column + 2,
        gridTemplateRows: '1fr',
      }}
      row={row}
      column={column}
    >
      <div className="odds">
        <p>{awayOdds}</p>
      </div>
      <div className="odds">
        <p>{homeOdds}</p>
      </div>
    </GridCell>
  );
}

export default MoneyLineCell;
