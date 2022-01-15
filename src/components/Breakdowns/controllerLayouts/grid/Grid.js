import React from 'react';
import styled from 'styled-components';
import GridBody from './GridBody';
import GridHeaders from './GridHeaders';

const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: 52px;
  height: -moz-min-content;
  height: min-intrinsic;
  height: min-content;
  padding: 0 16px 0 0;
  gap: 5px;
  background-color: transparent;
  color: var(--betbro-blue);
`;

function Grid({ matchups, statSelections, stats, sportsbook }) {
  return (
    <GridContainer rows={statSelections.length}>
      <GridHeaders matchups={matchups} />
      <GridBody
        matchups={matchups}
        statSelections={statSelections}
        stats={stats}
        sportsbook={sportsbook}
      />
    </GridContainer>
  );
}

export default Grid;
