import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Selectors from './Selectors';
import Grid from './Grid';
import NotEnoughRoom from './NotEnoughRoom';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;

  .grid-container {
    display: flex;
    margin: auto;
    height: 100%;
    background-color: rgba(200, 200, 200, 0.8);
    border-radius: 6px;
  }

  .selector-column {
    display: flex;
    background-color: var(--betbro-blue);
    border-right: 1px solid #ddd;
    position: sticky;
    left: 0;
    padding: 0 4px 4px;
    gap: 5px;
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function saveWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', saveWindowWidth);

    return () => window.removeEventListener('resize', saveWindowWidth);
  }, []);

  return windowWidth > 768 ? (
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
  ) : (
    <NotEnoughRoom />
  );
}
