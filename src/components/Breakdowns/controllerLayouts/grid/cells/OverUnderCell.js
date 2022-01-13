import React from 'react';
import styled from 'styled-components';
import { GridCell } from '../../sharedStyles';

const AltGridCell = styled(GridCell)`
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(2, 1fr);
`;

function OverUnderCell({ row, column, matchup, selection, sportsbook }) {
  const selectedData = matchup[selection].find(
    (site) => site.site_key === sportsbook,
  );

  const points = selectedData?.data.points || 'n/a';
  const overOdds = selectedData?.data.odds[0] || 'n/a';
  const underOdds = selectedData?.data.odds[1] || 'n/a';

  return (
    <AltGridCell
      style={{ gridRowStart: row, gridColumnStart: column }}
      row={row}
      column={column}
    >
      <div className="odds span-2">
        <p>
          <strong>{points}</strong>
        </p>
      </div>
      <div>
        <p>U: {underOdds}</p>
      </div>
      <div>
        <p>O: {overOdds}</p>
      </div>
    </AltGridCell>
  );
}

export default OverUnderCell;
