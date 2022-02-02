import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoMatchupsContainer = styled.div`
  margin: 36px auto;

  .title {
    margin: 12px auto;
    padding: 0 12px;
  }

  .details {
    padding: 12px;
  }
`;

const NoMatchups = () => (
  <NoMatchupsContainer>
    <h1 className="title">No Matchups</h1>
    <p className="details">
      No matchups were detected for this week. Enjoy the offseason!
    </p>
    <p className="details">
      If it is NOT the offseason and you're seeing this message, please{' '}
      <Link style={{ textDecoration: 'underline' }} to="/contact">
        contact us
      </Link>
      .
    </p>
  </NoMatchupsContainer>
);

export default NoMatchups;
