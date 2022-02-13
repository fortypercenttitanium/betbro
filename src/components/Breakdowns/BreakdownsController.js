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
  return components[state];
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
    if (matchups && matchups.length < 1) {
      setControllerState('noMatchups');
    } else if (inErrorState) {
      setControllerState('error');
    } else if (loading) {
      setControllerState('loading');
    } else {
      setControllerState('success');
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
        success: renderSwitch(siteLayout, {
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
