import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import fetchStats, { initialSelections } from './tools/database';
import selectionList from './tools/selectionList';
import ranker from './tools/ranker';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Breakdowns from './components/Breakdowns/BreakdownsLayout';
import About from './components/About';
import NotFound from './components/NotFound';
import Contact from './components/Contact';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

function App() {
  const [headline, setHeadline] = useState('');
  const [selections, setSelections] = useState(initialSelections);
  const [matchups, setMatchups] = useState([]);
  const [rankings, setRankings] = useState({});
  const [records, setRecords] = useState({});
  const [oddsLastUpdated, setOddsLastUpdated] = useState('');
  const [dataIsLoading, setDataIsLoading] = useState(true);
  //const [isMenuOpen, setIsMenuOpen] = useState(false);

  const propList = {
    selections,
    setSelections,
    matchups,
    setMatchups,
    rankings,
    records,
    setHeadline,
    oddsLastUpdated,
    dataIsLoading,
    setDataIsLoading,
  };

  // useEffect(() => {
  //   async function fetchOdds(week = thisWeek()) {
  //     try {
  //       const oddsDataRaw = await fetch(
  //         process.env.NODE_ENV === 'development'
  //           ? '/odds'
  //           : `${process.env.REACT_APP_API_URL}/odds`,
  //         {
  //           method: 'GET',
  //         },
  //       );
  //       if (!oddsDataRaw.ok) {
  //         throw new Error(oddsDataRaw.status + ': ' + oddsDataRaw.statusText);
  //       }
  //       const oddsJSON = await oddsDataRaw.json();
  //       const odds = JSON.parse(oddsJSON);
  //       const thisWeeksOdds = odds.data.filter((game) => {
  //         return game.week === week;
  //       });

  //       const statsArr = await setNewStats();

  //       //set team rankings for each stat
  //       const rankObj = {};
  //       selections.forEach((sel) => {
  //         if (selectionList[sel].category === 'stats') {
  //           rankObj[selectionList[sel].name] = ranker(
  //             statsArr,
  //             selectionList[sel].name,
  //           );
  //         }
  //       });
  //       setRankings(rankObj);

  //       const currentMatchups = thisWeeksOdds.map((matchup) => {
  //         return {
  //           homeTeam: statsArr.find((item) => item.team === matchup.home_team),
  //           awayTeam: statsArr.find(
  //             (item) =>
  //               item.team ===
  //               matchup.teams.find((team) => team !== matchup.home_team),
  //           ),
  //           time: moment(matchup.commence_time),
  //           betting: {
  //             sites: matchup.sites,
  //             teams: matchup.teams,
  //           },
  //         };
  //       });

  //       setMatchups(currentMatchups);
  //       setOddsLastUpdated(odds.lastUpdated);
  //       setDataIsLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   // convert selection array numbers to their object equivalent
  //   async function setNewStats() {
  //     const initSelections = selections.map((sel) => {
  //       return selectionList[sel];
  //     });
  //     const fetchedStats = await fetchStats(initSelections);
  //     setRecords(fetchedStats.records);
  //     const filteredStats = fetchedStats.result.filter(
  //       (item) =>
  //         item.team !== 'Avg Tm/G' &&
  //         item.team !== 'League Total' &&
  //         item.team !== 'Avg Team',
  //     );
  //     return filteredStats;
  //   }
  //   fetchOdds();
  // }, [selections]);

  return (
    <div
      className="App"
      style={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <NavBar headline={headline} />
      {/* {headline !== '' && <Headline headline={headline} />} */}
      <MainContainer>
        <Routes>
          <Route exact path="/" element={<Breakdowns propList={propList} />} />

          <Route path="/home" element={<Home setHeadline={setHeadline} />} />

          <Route path="/about" element={<About setHeadline={setHeadline} />} />
          <Route
            path="/contact"
            element={<Contact setHeadline={setHeadline} />}
          />
          <Route path="*" element={<NotFound setHeadline={setHeadline} />} />
        </Routes>
      </MainContainer>
    </div>
  );
}

export default App;
