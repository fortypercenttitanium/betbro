import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import fetchStats, { initialSelections } from './tools/database';
import selectionList from './tools/selectionList';
import statNameAPI from './tools/statNameAPI';
import NavBar from './components/Navbar';
import Headline from './components/Headline';
import Home from './components/Home';
import Breakdowns from './components/Breakdowns';
import About from './components/About';
import MyBetBro from './components/MyBetBro';
import NotFound from './components/NotFound';
const weeks = require('./tools/weeks');
const { thisWeek } = weeks;

function App() {
	const [headline, setHeadline] = useState(window.location.pathname);
	useEffect(() => {
		setHeadline(window.location.pathname);
	}, []);

	const [selections, setSelections] = useState(initialSelections);
	const [matchups, setMatchups] = useState([]);

	const propList = {
		selections,
		setSelections,
		matchups,
		setMatchups,
	};

	useEffect(() => {
		async function fetchOdds(week = thisWeek()) {
			try {
				const oddsDataRaw = await fetch('/odds');
				const oddsJSON = await oddsDataRaw.json();
				const odds = JSON.parse(oddsJSON);
				console.log(odds);
				const thisWeeksOdds = odds.data.filter((game) => {
					return game.week === week;
				});

				const statsArr = await setNewStats();

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
			return fetchedStats;
		}
		fetchOdds();
	}, [selections]);

	return (
		<BrowserRouter>
			<div className='App'>
				<NavBar />
				<Headline headline={headline} />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/breakdowns'>
						<Breakdowns propList={propList} />{' '}
					</Route>
					<Route exact path='/mybetbro' component={MyBetBro} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
