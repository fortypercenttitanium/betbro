import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Store from '../../tools/localStorage/Store';
import StatsFetcher from '../../tools/fetchers/StatsFetcher';
import OddsFetcher from '../../tools/fetchers/OddsFetcher';
import BreakdownsHeader from './BreakdownsHeader';
import BreakdownsController from './BreakdownsController';

const store = new Store();
const statsFetcher = new StatsFetcher();
const oddsFetcher = new OddsFetcher();

const defaultStatSelections = [0, 81, 82, 83, 2, 3, 17, 11, 41, 44, 47, 50, 52];
const defaultSportsbook = 'draftkings';

const BreakdownsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

function BreakdownsLayout() {
  const [inErrorState, setInErrorState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState();
  const [matchups, setMatchups] = useState();
  const [sportsbook, setSportsbook] = useState();
  const [statSelections, setStatSelections] = useState([]);
  const [statsLastUpdated, setStatsLastUpdated] = useState('');
  const [oddsLastUpdated, setOddsLastUpdated] = useState('');
  const [siteLayout, setSiteLayout] = useState('grid');

  useEffect(() => {
    async function fetchStats() {
      const result = await statsFetcher.getStats();

      if (result.error) {
        return setInErrorState(true);
      }

      setStatsLastUpdated(result.lastUpdated);
      setStats(result.stats);
    }

    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchOdds() {
      const result = await oddsFetcher.getOdds();

      if (result.error) {
        return setInErrorState(true);
      }

      setOddsLastUpdated(result.lastUpdated);
      setMatchups(result.matchups);
    }

    fetchOdds();
  }, []);

  useEffect(() => {
    // check for local storage selections
    const storedStatSelections = store.getStatSelections();

    if (storedStatSelections) {
      setStatSelections(storedStatSelections);
    } else {
      setStatSelections(defaultStatSelections);
    }
  }, []);

  useEffect(() => {
    // check for local storage sportsbook
    const storedSportsbook = store.getBookSelection();

    if (storedSportsbook) {
      setSportsbook(storedSportsbook);
    } else {
      setSportsbook(defaultSportsbook);
    }
  }, []);

  useEffect(() => {
    if (!inErrorState) {
      if (stats && matchups && statSelections.length) {
        setLoading(false);
      }
    }
  }, [inErrorState, stats, matchups, sportsbook, statSelections]);

  function handleChangeSportsbook(book) {
    store.setBookSelection(book);
    setSportsbook(book);
  }

  function handleChangeSelections(selections) {
    store.setStatSelections(selections);
    setStatSelections(selections);
  }

  return (
    <BreakdownsContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Don't place your NFL bets until you analyze this week's matchup statistics!"
        />
        <title>{`Bro's Breakdowns`}</title>
      </Helmet>
      <BreakdownsHeader
        sportsbook={sportsbook}
        onChangeSportsbook={handleChangeSportsbook}
        statsLastUpdated={statsLastUpdated}
        oddsLastUpdated={oddsLastUpdated}
        onChangeLayout={setSiteLayout}
        siteLayout={siteLayout}
      />
      <BreakdownsController
        siteLayout={siteLayout}
        loading={loading}
        inErrorState={inErrorState}
        sportsbook={sportsbook}
        stats={stats}
        matchups={matchups}
        statSelections={statSelections}
        setStatSelections={handleChangeSelections}
      />
    </BreakdownsContainer>
  );
}

export default BreakdownsLayout;
