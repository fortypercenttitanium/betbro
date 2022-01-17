import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  margin: 36px auto;

  .error-title {
    margin: 12px auto;
    padding: 0 12px;
  }

  .error-details {
    padding: 12px;
  }
`;

const ErrorState = () => (
  <ErrorContainer>
    <h1 className="error-title">Something went wrong</h1>
    <p className="error-details">
      Unfortunately, we can't display this data at the moment.
    </p>
    <p className="error-details">
      If this problem persists, please{' '}
      <Link style={{ textDecoration: 'underline' }} to="/contact">
        contact us
      </Link>
      .
    </p>
  </ErrorContainer>
);

export default ErrorState;
