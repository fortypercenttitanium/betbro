import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import abbTeam, { teamsArray } from '../tools/teamAbbreviations';
import thisWeek from '../tools/weeks';

const Grid = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;

const VertFlexBox = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function Breakdowns() {
	const [stats, setStats] = useState([]);
	const [odds, setOdds] = useState([]);
	const [selections, setSelections] = useState([]);
	const [matchups, setMatchups] = useState([]);

	useEffect(() => {
		async function fetchStats() {
			try {
				const offensiveStatsRaw = await fetch(`/offense`);
				const defensiveStatsRaw = await fetch(`/defense`);
				const offensiveStats = await offensiveStatsRaw.json();
				const defensiveStats = await defensiveStatsRaw.json();
				console.log(
					offensiveStats
						.filter((item) => item.g !== '')
						.map((stats) => {
							return {
								team: stats.team,
								offense: {
									passingYards:
										offensiveStats[
											offensiveStats.findIndex((obj) => obj.team === stats.team)
										].passYds,
								},
								defense: {
									pointsAgainst:
										defensiveStats[
											defensiveStats.findIndex((obj) => obj.team === stats.team)
										].points,
								},
							};
						})
				);
				setStats({
					offense: offensiveStats,
					defense: defensiveStats,
				});
			} catch (err) {
				console.error(err);
			}
		}

		async function fetchOdds(week) {
			try {
				const oddsDataRaw = await fetch('/odds');
				const odds = await oddsDataRaw.json();
				const thisWeeksOdds = odds.data.filter((game) => {
					return moment(game.commence_time).isBefore(thisWeek());
				});

				const currentMatchups = thisWeeksOdds.map((matchup) => {
					return {
						homeTeam: matchup.home_team,
						awayTeam: matchup.teams.find((team) => team !== matchup.home_team),
						time: moment(matchup.commence_time),
					};
				});
				setMatchups(currentMatchups);
				setOdds(thisWeeksOdds);
			} catch (err) {
				console.error(err);
			}
		}

		fetchStats();
		fetchOdds();
	}, []);
	return (
		<div>
			<Grid>
				<div></div>
				{matchups.map((matchup, mIndex) => {
					return (
						<div
							key={mIndex}
							style={{
								textAlign: 'center',
								border: '1px solid black',
								flex: '1',
							}}
						>
							<p style={{ backgroundColor: 'lightblue' }}>
								{abbTeam(matchup.awayTeam)} @ {abbTeam(matchup.homeTeam)}
							</p>
							{/* {matchup.sites.map((site, sIndex) => {
								return (
									<div
										key={sIndex}
										style={{
											backgroundColor: sIndex % 2 === 0 ? 'lightgrey' : 'white',
										}}
									>
										{site.site_nice}
										<p>
											{matchup.teams[0]} {site.odds.spreads.points[0]}
										</p>
										<p>
											{matchup.teams[1]} {site.odds.spreads.points[1]}
										</p>
									</div>
								);
							})} */}
						</div>
					);
				})}
			</Grid>
		</div>
	);
}
