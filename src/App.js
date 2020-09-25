import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import fetchStats, { initialSelections } from './tools/database';
import selectionList from './tools/selectionList';
import ranker from './tools/ranker';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Breakdowns from './components/Breakdowns';
import About from './components/About';
import MyBetBro from './components/MyBetBro';
import NotFound from './components/NotFound';
import Contact from './components/Contact';
const weeks = require('./tools/weeks');
const { thisWeek } = weeks;

const MainContainer = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - 6rem - 4px);
	background: url('images/bg.png');
	background-size: contain;
	overflow: auto;
`;

function App() {
	const [headline, setHeadline] = useState('');
	const [selections, setSelections] = useState(initialSelections);
	const [matchups, setMatchups] = useState([]);
	const [rankings, setRankings] = useState({});
	const [records, setRecords] = useState({});
	//const [isMenuOpen, setIsMenuOpen] = useState(false);

	const propList = {
		selections,
		setSelections,
		matchups,
		setMatchups,
		rankings,
		records,
		setHeadline,
	};

	useEffect(() => {
		async function fetchOdds(week = thisWeek()) {
			try {
				const key = process.env.hasOwnProperty('REACT_APP_API_KEY')
					? process.env.REACT_APP_API_KEY
					: process.env.API_KEY;
				const oddsDataRaw = await fetch(
					process.env.NODE_ENV === 'development'
						? '/odds'
						: process.env.hasOwnProperty('REACT_APP_API_URL')
						? `${process.env.REACT_APP_API_URL}/odds`
						: `${process.env.REACT_APP_API_URL}/odds`,
					{
						method: 'POST',
						headers: {
							authorization: `Basic ${key}`,
						},
					}
				);
				if (!oddsDataRaw.ok) {
					throw new Error(oddsDataRaw.status + ': ' + oddsDataRaw.statusText);
				}
				const oddsJSON = await oddsDataRaw.json();
				const odds = JSON.parse(oddsJSON);
				const thisWeeksOdds = odds.data.filter((game) => {
					return game.week === week;
				});

				const statsArr = await setNewStats();

				//set team rankings for each stat
				const rankObj = {};
				selections.forEach((sel) => {
					if (selectionList[sel].category === 'stats') {
						rankObj[selectionList[sel].name] = ranker(
							statsArr,
							selectionList[sel].name
						);
					}
				});
				setRankings(rankObj);

				const currentMatchups = thisWeeksOdds.map((matchup) => {
					return {
						homeTeam: statsArr.find((item) => item.team === matchup.home_team),
						awayTeam: statsArr.find(
							(item) =>
								item.team ===
								matchup.teams.find((team) => team !== matchup.home_team)
						),
						time: moment(matchup.commence_time),
						betting: {
							sites: matchup.sites,
							teams: matchup.teams,
						},
					};
				});

				setMatchups(currentMatchups);
			} catch (err) {
				console.error(err);
			}
		}
		// convert selection array numbers to their object equivalent
		async function setNewStats() {
			const initSelections = selections.map((sel) => {
				return selectionList[sel];
			});
			const fetchedStats = await fetchStats(initSelections);
			setRecords(fetchedStats.records);
			const filteredStats = fetchedStats.result.filter(
				(item) =>
					item.team !== 'Avg Tm/G' &&
					item.team !== 'League Total' &&
					item.team !== 'Avg Team'
			);
			return filteredStats;
		}
		fetchOdds();
	}, [selections]);

	return (
		<div
			className='App'
			style={{
				height: '100%',
			}}
		>
			<NavBar headline={headline} />
			{/* {headline !== '' && <Headline headline={headline} />} */}
			<MainContainer>
				<Switch>
					<Route exact path='/'>
						<Home setHeadline={setHeadline} />
					</Route>
					<Route path='/about'>
						<About setHeadline={setHeadline} />
					</Route>
					<Route path='/breakdowns'>
						<Breakdowns propList={propList} />{' '}
					</Route>
					<Route path='/mybetbro'>
						<MyBetBro setHeadline={setHeadline} />
					</Route>
					<Route path='/contact'>
						<Contact setHeadline={setHeadline} />
					</Route>
					<Route path='*'>
						<NotFound setHeadline={setHeadline} />
					</Route>
				</Switch>
			</MainContainer>
		</div>
	);
}

export default App;
