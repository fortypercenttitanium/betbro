import React from 'react';
import styled from 'styled-components';
import ErrorState from './ErrorState';
import Loading from '../Loading';
import GridLayout from './controllerLayouts/grid/GridLayout';
import TileLayout from './controllerLayouts/tile/TileLayout';

const ControllerContainer = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  text-align: center;

  .error-title {
    margin: 60px auto 24px;
    padding: 0 12px;
  }

  .error-details {
    padding: 12px;
  }
`;

function renderSwitch(state, components) {
  switch (state) {
    case 'loading':
      return components.loading;
    case 'error':
      return components.error;
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
}) {
  const controllerState = loading ? 'loading' : inErrorState ? 'error' : '';

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
        success: renderView(siteLayout, {
          grid: (
            <GridLayout
              sportsbook={sportsbook}
              stats={stats}
              matchups={matchups}
              statSelections={statSelections}
              setStatSelections={setStatSelections}
              handleChangeStatSelections={handleChangeStatSelections}
            />
          ),
          tile: <TileLayout />,
        }),
      })}
    </ControllerContainer>
  );
}

export default BreakdownsController;
