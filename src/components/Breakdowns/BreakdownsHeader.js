import React from 'react';
import styled from 'styled-components';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import toDate from 'date-fns/toDate';
import statNames from '../../tools/namingLibrary/statNames';

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
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
    align-items: center;
    justify-content: center;
    text-align: center;
    @media (max-width: 900px) {
      &.no-mobile {
        display: none;
      }
    }

    .layout-select-label {
      display: block;
      padding: 24px;

      .layout-select {
        display: flex;
        font-size: 1.3rem;
        padding: 6px 12px;
      }
    }
  }
`;

function BreakdownsHeader({
  onChangeSportsbook: handleChangeSportsbook,
  onChangeLayout: handleChangeLayout,
  siteLayout,
  sportsbook,
  oddsLastUpdated,
  statsLastUpdated,
}) {
  return (
    <Header>
      <div className="header-container">
        <label htmlFor="odds-selector" className="layout-select-label hidden">
          <h3>Sportsbook</h3>
          <select
            className="layout-select"
            name="odds-selector"
            value={sportsbook}
            onChange={(e) => {
              handleChangeSportsbook(e.target.value);
            }}
          >
            {Object.values(statNames.sites).map((site, i) => {
              return (
                <option key={i} value={Object.keys(statNames.sites)[i]}>
                  {site}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="header-container no-mobile">
        <label htmlFor="view-mode" className="layout-select-label">
          <h3>Layout</h3>
          <select
            onChange={handleChangeLayout}
            value={siteLayout}
            className="layout-select"
          >
            <option value="tile">Tile</option>
            <option value="grid">Grid</option>
          </select>
        </label>
      </div>
      <div className="header-container">
        <div className="centered">
          {oddsLastUpdated && (
            <>
              <h4>Odds updated</h4>
              <p>
                {formatDistanceToNow(new Date(oddsLastUpdated), {
                  addSuffix: true,
                })}
                {/* {oddsLastUpdated} */}
              </p>
            </>
          )}
          {statsLastUpdated && (
            <>
              <h4>Stats updated</h4>
              <p>
                {formatDistanceToNow(new Date(statsLastUpdated), {
                  addSuffix: true,
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </Header>
  );
}

export default BreakdownsHeader;
