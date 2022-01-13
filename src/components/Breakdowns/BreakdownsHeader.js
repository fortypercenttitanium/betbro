import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import statNames from '../../tools/namingLibrary/statNames';

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #ddd;
  @media (max-width: 600px) {
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
    padding: 8px;

    .odds-last-updated {
      display: flex;
      flex-direction: column;
      h4 {
        font-weight: bold;
      }

      @media (max-width: 600px) {
        flex-direction: row;
        h4 {
          padding-right: 4px;
        }
      }
    }
  }
`;

const selectStyles = (width) => ({
  control: (styles) => ({
    ...styles,
    minWidth: width,
    cursor: 'pointer',
  }),
  option: (styles) => ({
    ...styles,
    color: '#444',
    cursor: 'pointer',
  }),
});

const layoutOptions = [
  {
    value: 'grid',
    label: 'Grid',
  },
  {
    value: 'tile',
    label: 'Tile',
  },
];

function BreakdownsHeader({
  onChangeSportsbook: handleChangeSportsbook,
  onChangeLayout: handleChangeLayout,
  siteLayout,
  sportsbook,
  oddsLastUpdated,
  statsLastUpdated,
  matchups,
}) {
  const [siteOptions, setSiteOptions] = useState([]);

  useEffect(() => {
    if (matchups && matchups.length) {
      // loop through matchups
      const newSiteOptions = matchups.reduce((acc, matchup) => {
        // combine all three odds types
        const combinedOdds = [
          ...matchup.moneyLine,
          ...matchup.spreads,
          ...matchup.overUnder,
        ].reduce((acc, oddsData) => {
          if (!acc.some((foundSite) => oddsData.site_key === foundSite.value)) {
            acc.push({ value: oddsData.site_key, label: oddsData.site_nice });
          }

          return acc;
        }, []);

        // add unique values to list
        combinedOdds.forEach((site) => {
          if (!acc.some((foundSite) => site.value === foundSite.value)) {
            acc.push(site);
          }
        });

        return acc;
      }, []);

      setSiteOptions(newSiteOptions);
    }
  }, [matchups]);

  return (
    <Header>
      <div className="header-container">
        <label htmlFor="odds-selector" className="layout-select-label hidden">
          <h3>Sportsbook</h3>
          <Select
            styles={selectStyles(180)}
            name="odds-selector"
            isLoading={!sportsbook && !siteOptions.length}
            options={siteOptions}
            value={siteOptions.find((option) => option.value === sportsbook)}
            onChange={(option) => handleChangeSportsbook(option.value)}
            isClearable={false}
            isSearchable={false}
          />
        </label>
      </div>
      <div className="header-container">
        <label htmlFor="view-mode" className="layout-select-label">
          <h3>Layout</h3>
          <Select
            styles={selectStyles(120)}
            options={layoutOptions}
            onChange={(option) => handleChangeLayout(option.value)}
            value={layoutOptions.find((option) => option.value === siteLayout)}
            isClearable={false}
            isSearchable={false}
          />
        </label>
      </div>
      <div className="header-container">
        {oddsLastUpdated && (
          <div className="odds-last-updated">
            <h4>Odds last updated:</h4>
            <p>
              {formatDistanceToNow(new Date(oddsLastUpdated), {
                addSuffix: true,
              })}
            </p>
          </div>
        )}
        {statsLastUpdated && (
          <div className="odds-last-updated">
            <h4>Stats last updated:</h4>
            <p>
              {formatDistanceToNow(new Date(statsLastUpdated), {
                addSuffix: true,
              })}
            </p>
          </div>
        )}
      </div>
    </Header>
  );
}

export default BreakdownsHeader;
