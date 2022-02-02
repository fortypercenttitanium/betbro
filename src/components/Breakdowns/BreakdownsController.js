import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrorState from './ErrorState';
import NoMatchups from './NoMatchups';
import Loading from '../Loading';
import GridLayout from './controllerLayouts/grid/GridLayout';
import TileLayout from './controllerLayouts/tile/TileLayout';

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

function renderSwitch(state, components) {
  switch (state) {
    case 'error':
      return components.error;
    case 'loading':
      return components.loading;
    case 'uninitialized':
      return <div />;
    case 'noMatchups':
      return components.noMatchups;
    default:
      return components.success;
  }
}

function renderView(state, components) {
  switch (state) {
    case 'tile':
      return components.tile;
    default:
      return components.grid;
  }
}

function BreakdownsController({
  siteLayout,
  loading,
  inErrorState,
  sportsbook,
  stats,
  matchups,
  statSelections,
  setStatSelections,
  selectionList,
}) {
  const [controllerState, setControllerState] = useState('uninitialized');

  useEffect(() => {
    if (inErrorState) {
      setControllerState('error');
    } else if (loading) {
      setControllerState('loading');
    } else if (matchups.length < 1) {
      setControllerState('noMatchups');
    } else {
      setControllerState('');
    }
  }, [inErrorState, loading, matchups]);

  function handleChangeStatSelections(selection, i) {
    const newSelections = [...statSelections];
    newSelections[i] = selection;

    setStatSelections(newSelections);
  }

  return (
    <ControllerContainer>
      {renderSwitch(controllerState, {
        loading: <Loading />,
        error: <ErrorState />,
        noMatchups: <NoMatchups />,
        success: renderView(siteLayout, {
          grid: (
            <GridLayout
              sportsbook={sportsbook}
              stats={stats?.stats}
              matchups={matchups}
              statSelections={statSelections}
              setStatSelections={setStatSelections}
              selectionList={selectionList}
              handleChangeStatSelections={handleChangeStatSelections}
            />
          ),
          tile: (
            <TileLayout
              sportsbook={sportsbook}
              stats={stats?.stats}
              matchups={matchups}
              statSelections={statSelections}
              setStatSelections={setStatSelections}
              selectionList={selectionList}
              handleChangeStatSelections={handleChangeStatSelections}
            />
          ),
        }),
      })}
    </ControllerContainer>
  );
}

export default BreakdownsController;
