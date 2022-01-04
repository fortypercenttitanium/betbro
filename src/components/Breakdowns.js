import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import selectionList from '../tools/namingLibrary/selectionList';
// import LoadingScreen from './LoadingScreen';
import TileBanner from './TileBanner';
import GridLayout from './GridLayout';
import TileLayout from './TileLayout';
import Loading from './Loading';
import TileDetailedView from './TileDetailedView';
import getOddsData from '../tools/getOddsData';
// const weeks = require('../tools/weeks');
// const thisWeek = weeks.thisWeek();

const BreakdownsDiv = styled.div`
  display: flex;
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const MatchupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  max-width: 1000px;
  align-items: center;
  text-align: center;
`;

export default function Breakdowns({ propList }) {
  const {
    selections,
    setSelections,
    matchups,
    rankings,
    records,
    setHeadline,
    oddsLastUpdated,
    dataIsLoading,
  } = propList;

  const [oddsSnapshotSite, setOddsSnapshotSite] = useState('draftkings');
  const [siteLayout, setSiteLayout] = useState('tile');
  const [tileDetailedView, setTileDetailedView] = useState(null);

  const toggleLayout = () => {
    setSiteLayout(siteLayout === 'grid' ? 'tile' : 'grid');
  };

  useEffect(() => {
    setHeadline(`breakdowns`);
  }, [setHeadline]);

  const handleSelectorChange = (e, i) => {
    const newSelections = [...selections];
    newSelections[i] = Number(e.target.value);
    setSelections(newSelections);
  };
  const bannerProps = {
    siteLayout,
    toggleLayout,
    oddsSnapshotSite,
    setOddsSnapshotSite,
    oddsLastUpdated,
  };

  const gridStatProps = {
    matchups,
    selections,
    selectionList,
    rankings,
    getOddsData,
    oddsSnapshotSite,
  };

  const gridProps = {
    siteLayout,
    toggleLayout,
    selections,
    selectionList,
    handleSelectorChange,
    matchups,
    oddsSnapshotSite,
    setOddsSnapshotSite,
    oddsLastUpdated,
  };

  const tileProps = {
    matchups,
    getOddsData,
    oddsSnapshotSite,
    records,
    setTileDetailedView,
  };

  const tileDetailProps = {
    tileDetailedView,
    setTileDetailedView,
    selectionList,
    selections,
    getOddsData,
    rankings,
    handleSelectorChange,
    matchups,
    oddsSnapshotSite,
  };

  return (
    <BreakdownsDiv>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Don't place your NFL bets until you analyze this week's matchup statistics!"
        />
        <title>{`Bro's Breakdowns`}</title>
      </Helmet>
      {dataIsLoading ? (
        <Loading />
      ) : (
        <>
          {tileDetailedView !== null && (
            <TileDetailedView propsList={tileDetailProps} />
          )}
          {siteLayout === 'tile' && (
            <MatchupContainer>
              <TileBanner propsList={bannerProps} />
              <TileLayout propsList={tileProps} />
            </MatchupContainer>
          )}
          {siteLayout === 'grid' && (
            <GridLayout gridProps={gridProps} gridStatProps={gridStatProps} />
          )}{' '}
        </>
      )}
    </BreakdownsDiv>
  );
}
