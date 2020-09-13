import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import abbTeam from '../tools/teamAbbreviations';
import statNameAPI from '../tools/statNameAPI';
import moment from 'moment';

const Grid = styled.div`
	display: grid;
	grid-auto-rows: 45px;
	gap: 5px;
	background-color: #666;
	overflow: auto;
`;

const MatchupContainer = styled.div`
	display: flex;
	margin: 0 auto;
	flex-wrap: wrap;
	max-width: 1000px;
	height: 100%;
	justify-content: center;
`;

const MatchupCard = styled.div`
	border-radius: 1rem;
	border: 1px solid black;
	max-width: 340px;
	margin: 1rem;
	padding: 1rem;
	flex: 1;
	flex-basis: 16rem;
	text-align: center;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 2rem;
`;

const H2 = styled.h2`
	font-size: 1.5rem;
`;

const H3 = styled.h3`
	font-size: 1rem;
	margin: auto;
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

export default function Breakdowns(props) {
	const {
		odds,
		setOdds,
		selections,
		setSelections,
		matchups,
		setMatchups,
	} = props.propList;

	const [oddsSnapshotSite, setOddsSnapshotSite] = useState('draftkings');

	const findMatchupOdds = (matchup, index) => {
		const homeIndex = odds[index].teams.findIndex(
			(team) => team === matchup.homeTeam.team
		);
		const awayIndex = odds[index].teams.findIndex(
			(team) => team === matchup.awayTeam.team
		);
		const oddsObj = odds[index].sites.find(
			(site) => site.site_key === oddsSnapshotSite
		);

		const result = {
			homeOdds: {
				moneyLine: oddsObj.odds.moneyLine[homeIndex],
				spread: oddsObj.odds.spreads[homeIndex],
			},
			awayOdds: {
				moneyLine: oddsObj.odds.moneyLine[awayIndex],
				spread: oddsObj.odds.spreads[awayIndex],
			},
			overUnder: oddsObj.odds.overUnder[0],
		};
		return result;
	};

	const renderStats = () => {
		const arr = [];
		for (let i = 0; i < selections.length; i++) {
			arr.push(
				matchups
					.sort((a, b) => {
						return a.time.isBefore(b.time) ? -1 : 1;
					})
					.map((matchup, index) => {
						return (
							<MiniGrid
								key={index}
								style={{ gridRowStart: i + 2, gridColumnStart: index + 2 }}
							>
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
		<MatchupContainer>
			{odds.length > 0 &&
				matchups.map((matchup, index) => {
					return (
						<MatchupCard key={index}>
							<H3 style={{ display: 'inline' }}>
								({findMatchupOdds(matchup, index).awayOdds.moneyLine})
							</H3>
							{'  '}
							<H1 style={{ display: 'inline' }}>
								{abbTeam(matchup.awayTeam.team)}
							</H1>{' '}
							<H1 style={{ display: 'inline' }}>
								@ {abbTeam(matchup.homeTeam.team)}
							</H1>
							{'  '}
							<H3 style={{ display: 'inline' }}>
								({findMatchupOdds(matchup, index).homeOdds.moneyLine})
							</H3>
							<H2>{matchup.time.format('dddd MMM. Do, h:mma')}</H2>
							<H3>
								Spread: {abbTeam(matchup.awayTeam.team)}{' '}
								{findMatchupOdds(matchup, index).awayOdds.spread},{' '}
								{abbTeam(matchup.homeTeam.team)}{' '}
								{findMatchupOdds(matchup, index).homeOdds.spread}
							</H3>
						</MatchupCard>
					);
				})}
		</MatchupContainer>
	);
}
