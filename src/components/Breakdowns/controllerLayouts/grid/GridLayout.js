import React from 'react';
import styled from 'styled-components';
import Selectors from './Selectors';
import Grid from './Grid';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: auto;

  .grid-container {
    display: flex;
    margin: auto;
    height: 100%;
    background-color: rgba(250, 250, 250, 0.8);
    border-radius: 6px;
  }

  .selector-column {
    display: flex;
    position: sticky;
    left: 0;
    padding-bottom: 1rem;
    gap: 5px;
    border-right: 4px solid rgba(20, 20, 20, 0.5);
    flex-direction: column;
    grid-row-start: 2;
    & > * {
      flex-basis: 52px;
    }

    .blank-cell {
      display: 'flex';
      background: 'transparent';
    }
  }
`;

export default function GridLayout(props) {
  const {
    selectionList,
    statSelections,
    handleChangeStatSelections,
    matchups,
    sportsbook,
    stats,
  } = props;

  return (
    <MainContainer>
      <div className="grid-container">
        <div className="selector-column">
          <div className="blank-cell" />
          <Selectors
            selections={statSelections}
            selectionList={selectionList}
            onChange={handleChangeStatSelections}
          />
        </div>
        <Grid
          matchups={matchups}
          statSelections={statSelections}
          stats={stats}
          sportsbook={sportsbook}
        />
      </div>
    </MainContainer>
  );
}
