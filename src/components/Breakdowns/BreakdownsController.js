import React from 'react';
import styled from 'styled-components';
import ErrorState from './ErrorState';
import Loading from '../Loading';

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

const Success = () => <div>Success!</div>;

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

function BreakdownsController({
  siteLayout,
  loading,
  inErrorState,
  sportsbook,
  stats,
  matchups,
}) {
  const controllerState = loading ? 'loading' : inErrorState ? 'error' : '';
  return (
    <ControllerContainer>
      {renderSwitch(controllerState, {
        loading: <Loading />,
        error: <ErrorState />,
        success: <Success />,
      })}
    </ControllerContainer>
  );
}

export default BreakdownsController;
