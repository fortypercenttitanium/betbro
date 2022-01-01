import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import toDate from 'date-fns/toDate';
import statNames from '../../tools/namingLibrary/statNames';

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
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
    }
  }
`;

const selectStyles = {
  input: (styles) => ({
    ...styles,
    minWidth: '140px',
  }),
  option: (styles) => ({
    ...styles,
    color: '#444',
  }),
};

const siteOptions = Object.entries(statNames.sites).map(([value, label]) => ({
  value,
  label,
}));

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
          <Select
            styles={selectStyles}
            className="layout-select"
            name="odds-selector"
            isLoading={!sportsbook}
            options={siteOptions}
            value={siteOptions.find((option) => option.value === sportsbook)}
            onChange={(option) => {
              console.log(option);
              handleChangeSportsbook(option.value);
            }}
          ></Select>
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
              <h4>
                Odds last updated:{' '}
                {formatDistanceToNow(new Date(oddsLastUpdated), {
                  addSuffix: true,
                })}
              </h4>
            </>
          )}
          {statsLastUpdated && (
            <>
              <h4>
                Stats last updated:{' '}
                {formatDistanceToNow(new Date(statsLastUpdated), {
                  addSuffix: true,
                })}
              </h4>
            </>
          )}
        </div>
      </div>
    </Header>
  );
}

export default BreakdownsHeader;
