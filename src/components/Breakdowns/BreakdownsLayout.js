import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Store from '../../tools/localStorage/Store';
import StatsFetcher from '../../tools/fetchers/StatsFetcher';
import OddsFetcher from '../../tools/fetchers/OddsFetcher';
import BreakdownsHeader from './BreakdownsHeader';
import BreakdownsController from './BreakdownsController';
import createSelectionList from '../../tools/namingLibrary/selectionList';
import {
  defaultStatSelections,
  defaultSportsbook,
  defaultLayout,
} from './defaults/defaults';

const store = new Store();
const statsFetcher = new StatsFetcher();
const oddsFetcher = new OddsFetcher();

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
  const [selectionList, setSelectionList] = useState([]);
  const [statSelections, setStatSelections] = useState([]);
  const [statsLastUpdated, setStatsLastUpdated] = useState('');
  const [oddsLastUpdated, setOddsLastUpdated] = useState('');
  const [siteLayout, setSiteLayout] = useState(defaultLayout);

  // Fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await statsFetcher.getStats();

        setStatsLastUpdated(result.lastUpdated);
        setSelectionList(createSelectionList(result.stats));
        setStats(result);
      } catch {
        return setInErrorState(true);
      }
    }

    fetchStats();
  }, []);

  // Fetch odds from API
  useEffect(() => {
    async function fetchOdds() {
      try {
        const result = await oddsFetcher.getOdds();

        setOddsLastUpdated(result.lastUpdated);
        setMatchups(result.matchups);
      } catch {
        return setInErrorState(true);
      }
    }

    fetchOdds();
  }, []);

  // Check for local storage selections of stats. These are saved when the user changes which stats they want to see
  useEffect(() => {
    const storedStatSelections = store.getStatSelections();

    if (storedStatSelections) {
      setStatSelections(storedStatSelections);
    } else {
      setStatSelections(defaultStatSelections);
    }
  }, []);

  // check for local storage selection of sportsbook. This is saved when the user changes their sportsbook selection
  useEffect(() => {
    const storedSportsbook = store.getBookSelection();

    if (storedSportsbook) {
      setSportsbook(storedSportsbook);
    } else {
      setSportsbook(defaultSportsbook);
    }
  }, []);

  // Check local storage for preferred layout mode. This is saved when the user changes which view omde they want to use
  useEffect(() => {
    const storedLayout = store.getLayout();

    if (storedLayout) {
      setSiteLayout(storedLayout);
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

  function handleChangeLayout(layout) {
    store.setLayout(layout);
    setSiteLayout(layout);
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
        onChangeSportsbook={handleChangeSportsbook}
        onChangeLayout={handleChangeLayout}
        siteLayout={siteLayout}
        sportsbook={sportsbook}
        oddsLastUpdated={oddsLastUpdated}
        statsLastUpdated={statsLastUpdated}
        matchups={matchups}
      />
      <BreakdownsController
        siteLayout={siteLayout}
        loading={loading}
        inErrorState={inErrorState}
        sportsbook={sportsbook}
        stats={stats}
        matchups={matchups}
        selectionList={selectionList}
        statSelections={statSelections}
        setStatSelections={handleChangeSelections}
      />
    </BreakdownsContainer>
  );
}

export default BreakdownsLayout;
