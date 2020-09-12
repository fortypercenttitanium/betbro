import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import abbTeam from '../tools/teamAbbreviations';
import thisWeek from '../tools/weeks';
import fetchStats, { initialSelections } from '../tools/database';
import newTeamName from '../tools/newTeamName';
import { statNameAPI } from '../tools/statNameAPI';

const Grid = styled.div`
	display: grid;
	grid-auto-rows: 45px;
	gap: 5px;
	background-color: #666;
	overflow: auto;
`;

const Cell = styled.div`
	display: flex;
	background: #ddd;
	width: 110px;
	text-align: center;
	grid-row-start: ${(props) => props.row};
	grid-column-start: ${(props) => props.col};
`;

const WideCell = styled(Cell)`
	width: 150px;
`;

const MiniGrid = styled.div`
	background: #ddd;
	display: grid;
	width: 110px;
	grid-template-rows: 2fr 1fr;
	grid-template-columns: repeat(2, 1fr);
	grid-row-start: ${(props) => props.row};
	grid-column-start: ${(props) => props.col};
`;

const StatDiv = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	text-align: center;
	align-items: center;
	&:first-child {
		border-right: 1px solid black;
	}
	&:last-child {
		border-left: 1px solid black;
	}
`;

const GaugeContainer = styled.div`
	grid-column: 1 / 3;
	text-align: center;
	width: 100%;
`;

const Span = styled.span`
	margin: auto;
`;

export default function Breakdowns() {
	const [odds, setOdds] = useState([]);
	const [selections, setSelections] = useState(initialSelections);
	const [matchups, setMatchups] = useState([]);

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

	// useEffect(() => {
	// 	console.log(odds);
	// });

	const renderStats = () => {
		const arr = [];
		for (let i = 0; i < selections.length; i++) {
			arr.push(
				matchups.map((matchup, index) => {
					return (
						<MiniGrid key={index} row={i + 2} col={index + 2}>
							<StatDiv>
								<Span>
									{selections[i].category === 'stats'
										? matchup.awayTeam[selections[i].selection]
										: odds.length > 0
										? odds[index].sites.find(
												(site) => site.site_key === selections[i].site
										  ).odds[selections[i].selection][
												odds[index].teams.findIndex(
													(ind) => ind === matchup.awayTeam.team
												)
										  ]
										: null}
								</Span>
							</StatDiv>
							<StatDiv>
								<Span>
									{selections[i].category === 'stats'
										? matchup.homeTeam[selections[i].selection]
										: odds.length > 0
										? odds[index].sites.find(
												(site) => site.site_key === selections[i].site
										  ).odds[selections[i].selection][
												odds[index].teams.findIndex(
													(ind) => ind === matchup.homeTeam.team
												)
										  ]
										: null}
								</Span>
							</StatDiv>
						</MiniGrid>
					);
				})
			);
		}
		return arr;
	};

	return (
		<Grid>
			{selections.map((sel, i) => {
				if (sel.category === 'stats') {
					return (
						<WideCell row={i + 2} col={1} key={i}>
							<Span>{statNameAPI[sel.selection]}</Span>
						</WideCell>
					);
				} else {
					return (
						<WideCell row={i + 2} col={1} key={i}>
							<Span>
								{statNameAPI[sel.selection]}
								<br />
								{odds.length > 0 &&
									odds
										.find((item) =>
											item.sites.some((nested) => nested.site_key === sel.site)
										)
										.sites.find((site) => site.site_key === sel.site).site_nice}
							</Span>
						</WideCell>
					);
				}
			})}
			{matchups.map((matchup, i) => {
				return (
					<Cell key={i} row={1} col={i + 2}>
						<Span>
							{`${abbTeam(matchup.awayTeam.team)} @ ${abbTeam(
								matchup.homeTeam.team
							)}`}
						</Span>
					</Cell>
				);
			})}
			{renderStats()}
		</Grid>
	);
}
