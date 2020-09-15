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

const BreakdownsDiv = styled.div`
	display: flex;
	position: relative;
	margin: 0;
	height: 100%;
	width: 100%;
`;

const MatchupContainer = styled.div`
	display: flex;
	margin: 0 auto;
	flex-wrap: wrap;
	width: 80%;
	max-width: 1000px;
	height: 100%;
	justify-content: center;
`;

const MatchupCard = styled.div`
	border-radius: 1rem;
	border: 1px solid black;
	max-width: 320px;
	flex-basis: 0;
	flex: 1 1;
	margin: 1rem;
	padding: 1rem;
	flex: 1;
	flex-basis: 16rem;
	text-align: center;
`;

const Selector = styled.select`
	font-size: 1rem;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 1.7rem;
	@media (max-width: 450px) {
		font-size: 1.3rem;
	}
`;

const H2 = styled.h2`
	font-size: 1.2rem;
	font-weight: normal;
	@media (max-width: 450px) {
		font-size: 1rem;
	}
`;

const H3 = styled.h3`
	font-size: 1rem;
	font-weight: normal;
	margin: auto;
	@media (max-width: 450px) {
		font-size: 0.8rem;
	}
`;

const Cell = styled.div`
	display: flex;
	background: #ddd;
	width: 110px;
	text-align: center;
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
		selectionList,
		setSelectionList,
	} = props.propList;

	const [oddsSnapshotSite, setOddsSnapshotSite] = useState('draftkings');
	const [siteLayout, setSiteLayout] = useState('tile');

	const findMatchupOdds = (matchup, index) => {
		const homeIndex = odds[index].teams.findIndex(
			(team) => team === matchup.homeTeam.team
		);
		const awayIndex = odds[index].teams.findIndex(
			(team) => team === matchup.awayTeam.team
		);
		const oddsObj =
			odds[index].sites.find((site) => site.site_key === oddsSnapshotSite) ||
			null;

		const result = oddsObj
			? {
					homeOdds: {
						moneyLine: oddsObj.odds.moneyLine[homeIndex] || 'n/a',
						spread: oddsObj.odds.spreads[homeIndex] || 'n/a',
					},
					awayOdds: {
						moneyLine: oddsObj.odds.moneyLine[awayIndex] || 'n/a',
						spread: oddsObj.odds.spreads[awayIndex] || 'n/a',
					},
					overUnder: oddsObj.odds.overUnder[0] || 'n/a',
			  }
			: {
					homeOdds: {
						moneyLine: 'n/a',
						spread: 'n/a',
					},
					awayOdds: {
						moneyLine: 'n/a',
						spread: 'n/a',
					},
					overUnder: 'n/a',
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
						console.log(index, odds);
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

	const handleSelectorChange = (e, i) => {
		const newSelections = [...selections];
		newSelections[i] = selectionList[e.target.value];
		setSelections(newSelections);
	};

	return (
		<BreakdownsDiv>
			{siteLayout === 'tile' && (
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
									<H3>O/U: {findMatchupOdds(matchup, index).overUnder}</H3>
								</MatchupCard>
							);
						})}
				</MatchupContainer>
			)}
			{siteLayout === 'grid' && odds.length > 0 && (
				<Grid>
					{selections.map((sel, i) => {
						if (sel.category === 'stats') {
							return (
								<WideCell row={i + 2} col={1} key={i}>
									<Selector
										defaultValue={i}
										onChange={(e) => {
											handleSelectorChange(e, i);
										}}
									>
										{selectionList.map((item, itemIndex) => {
											return item.category === 'stats' ? (
												<option value={itemIndex}>
													{statNameAPI[item.selection]}
												</option>
											) : (
												<option value={itemIndex}>
													{statNameAPI[item.selection]}({item.site})
												</option>
											);
										})}
									</Selector>
								</WideCell>
							);
						} else {
							return (
								<WideCell row={i + 2} col={1} key={i}>
									<Selector
										defaultValue={statNameAPI[sel.selection]}
										onChange={(e) => {
											handleSelectorChange(e, i);
										}}
									>
										{/* {statNameAPI[sel.selection]}
										{odds.length > 0 &&
											odds
												.find((item) =>
													item.sites.some(
														(nested) => nested.site_key === sel.site
													)
												)
												.sites.find((site) => site.site_key === sel.site)
												.site_nice} */}
									</Selector>
								</WideCell>
							);
						}
					})}
					{matchups.map((matchup, i) => {
						return (
							<Cell key={i} style={{ gridRowStart: 1, gridColumnStart: i + 2 }}>
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
			)}
		</BreakdownsDiv>
	);
}
