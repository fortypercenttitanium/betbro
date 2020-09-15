import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import thisWeek from './tools/weeks';
import fetchStats, { initialSelections } from './tools/database';
import newTeamName from './tools/newTeamName';
import statNameAPI from './tools/statNameAPI';
import NavBar from './components/Navbar';
import Headline from './components/Headline';
import Home from './components/Home';
import Breakdowns from './components/Breakdowns';
import About from './components/About';
import MyBetBro from './components/MyBetBro';
import NotFound from './components/NotFound';

function App() {
	const [headline, setHeadline] = useState(window.location.pathname);
	useEffect(() => {
		setHeadline(window.location.pathname);
	}, []);

	const [odds, setOdds] = useState([]);
	const [selections, setSelections] = useState(initialSelections);
	const [matchups, setMatchups] = useState([]);
	const [selectionList, setSelectionList] = useState([]);

	const propList = {
		odds,
		setOdds,
		selections,
		setSelections,
		matchups,
		setMatchups,
		selectionList,
		setSelectionList,
	};

	useEffect(() => {
		async function fetchOdds(week) {
			try {
				const oddsDataRaw = await fetch('/odds');
				const oddsJSON = await oddsDataRaw.json();
				const thisWeeksOdds = oddsJSON.data.filter((game) => {
					return moment(game.commence_time).isBefore(thisWeek());
				});

				const fetchedStats = await setNewStats();
				const statsArr = fetchedStats.map((st) => {
					st.team = newTeamName(st.team);
					return st;
				});

				const currentMatchups = thisWeeksOdds.map((matchup) => {
					return {
						homeTeam: statsArr.find((item) => item.team === matchup.home_team),
						awayTeam: statsArr.find(
							(item) =>
								item.team ===
								matchup.teams.find((team) => team !== matchup.home_team)
						),
						time: moment(matchup.commence_time),
					};
				});

				setMatchups(currentMatchups);
				setOdds(thisWeeksOdds);
			} catch (err) {
				console.error(err);
			}
		}

		async function setNewStats() {
			const fetchedStats = await fetchStats(selections);
			return fetchedStats;
		}
		fetchOdds();
	}, [selections]);

	useEffect(() => {
		if (odds.length > 0) {
			// initialize stat/odds selection list
			// this is dependent on odds because offering sites that aren't available might mess things up
			const selectionListInit = Object.keys(statNameAPI)
				.filter(
					(item) =>
						item !== 'spreads' || item !== 'moneyLine' || item !== 'overUnder'
				)
				.map((sel) => {
					return {
						category: 'stats',
						selection: sel,
					};
				});

			// add in odds available

			const oddsSitesList = odds.reduce((acc, val) => {
				val.sites
					.reduce((accB, valB) => {
						if (!accB.includes(valB.site_nice)) {
							accB.push(valB.site_nice);
						}
						return accB;
					}, [])
					.forEach((item) => {
						if (!acc.includes(item)) {
							acc.push(item);
						}
					});
				return acc;
			}, []);
			oddsSitesList.forEach((site) => {
				selectionListInit.push({
					category: 'odds',
					site: site,
					selection: 'moneyLine',
				});
				selectionListInit.push({
					category: 'odds',
					site: site,
					selection: 'spreads',
				});
				selectionListInit.push({
					category: 'odds',
					site: site,
					selection: 'overUnder',
				});
			});
			setSelectionList(selectionListInit);
		}
	}, [odds]);

	// useEffect(() => {
	// 	console.log(selections);
	// });
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
