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
  console.log(state);
  switch (state) {
    case 'error':
      return components.error;
    case 'loading':
      return components.loading;
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
  const controllerState = inErrorState ? 'error' : loading ? 'loading' : '';

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
