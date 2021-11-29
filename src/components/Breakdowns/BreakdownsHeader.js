import React from 'react';
import styled from 'styled-components';
import statNames from '../../tools/namingLibrary/statNames';

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 1rem;
  min-height: 7rem;
  border-bottom: 3px solid #ddd;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0;
  }

  .header-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: center;
    @media (max-width: 900px) {
      &.no-mobile {
        display: none;
      }
    }
  }

  .header-select {
    margin: auto;
    font-size: 1rem;
    background: var(--betbro-blue);
    color: #eee;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: calc(1rem + 3px);
    text-align: center;
    cursor: pointer;
  }

  .header-label {
    display: flex;
    flex-direction: column;
    visibility: hidden;
    .header-select {
      visibility: visible;
    }
  }
`;

function BreakdownsHeader({
  onChangeSportsbook: handleChangeSportsbook,
  onChangeLayout: handleChangeLayout,
  sportsbook,
  oddsLastUpdated,
  statsLastUpdated,
}) {
  return (
    <Header>
      <div className="header-container">
        <label htmlFor="odds-selector" className="header-label">
          Select book for odds data
          <select
            className="header-select"
            name="odds-selector"
            value={sportsbook}
            onChange={(e) => {
              handleChangeSportsbook(e.target.value);
            }}
          >
            {Object.values(statNames.sites).map((site, i) => {
              return (
                <option key={i} value={Object.keys(statNames.sites)[i]}>
                  Book: {site}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="header-container no-mobile">
        <div className="centered">
          <h3>Click to switch view mode:</h3>
        </div>
      </div>
      <div className="header-container">
        <div className="centered">
          <h3>Odds updated {oddsLastUpdated}</h3>
        </div>
      </div>
    </Header>
  );
}

export default BreakdownsHeader;
