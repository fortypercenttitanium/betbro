import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import abbTeam from '../tools/teamAbbreviations';
import selectionList from '../tools/selectionList';
import statNameAPI from '../tools/statNameAPI';
import moment from 'moment';

const Grid = styled.div`
	display: grid;
	margin: 0.2rem;
	grid-auto-rows: 45px;
	gap: 5px;
	background-color: white;
	overflow: auto;
	height: 100%;
`;

const BreakdownsDiv = styled.div`
	display: flex;
	position: relative;
	margin: 0;
	height: calc(100vh - 10rem);
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
	background: #2c2837;
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
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
	width: 120px;
	text-align: center;
`;

const WideCell = styled(Cell)`
	width: auto;
`;

const MiniGrid = styled.div`
	background: #ddd;
	display: grid;
	width: 120px;
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
	const { selections, setSelections, matchups } = props.propList;

	const [oddsSnapshotSite, setOddsSnapshotSite] = useState('draftkings');
	const [siteLayout, setSiteLayout] = useState('tile');

	const getTeamIndex = (matchupIndex, team) => {
		const odds = matchups[matchupIndex].betting;
		return odds.teams.indexOf(team);
	};

	const toggleLayout = () => {
		setSiteLayout(siteLayout === 'grid' ? 'tile' : 'grid');
	};

	// useEffect(() => {
	// 	console.log(matchups);
	// });

	const renderStats = () => {
		const arr = [];
		for (let i = 0; i < selections.length; i++) {
			arr.push(
				matchups.map((matchup, index) => {
					return selectionList[selections[i]].category === 'stats' ? (
						<MiniGrid
							key={index}
							style={{
								gridRowStart: i + 2,
								gridColumnStart: index + 2,
								backgroundColor: index % 2 === 0 ? '#eee' : 'ccc',
							}}
						>
							<StatDiv>
								<Span>
									{matchup.awayTeam[selectionList[selections[i]].name]}
								</Span>
							</StatDiv>
							<StatDiv>
								<Span>
									{matchup.homeTeam[selectionList[selections[i]].name]}
								</Span>
							</StatDiv>
						</MiniGrid>
					) : selectionList[selections[i]].name !== 'overUnder' ? (
						<MiniGrid
							key={index}
							style={{
								gridRowStart: i + 2,
								gridColumnStart: index + 2,
								backgroundColor: index % 2 === 0 ? '#eee' : 'ccc',
							}}
						>
							<StatDiv>
								<Span>
									{/* check whether that data exists for the selected site */}
									{matchup.betting.sites.find(
										(site) =>
											site.site_key === selectionList[selections[i]].site
									).odds[selectionList[selections[i]].name]
										? matchup.betting.sites.find(
												(site) =>
													site.site_key === selectionList[selections[i]].site
										  ).odds[selectionList[selections[i]].name][
												getTeamIndex(index, matchup.awayTeam.team)
										  ]
										: 'n/a'}
								</Span>
							</StatDiv>
							<StatDiv>
								<Span>
									{matchup.betting.sites.find(
										(site) =>
											site.site_key === selectionList[selections[i]].site
									).odds[selectionList[selections[i]].name]
										? matchup.betting.sites.find(
												(site) =>
													site.site_key === selectionList[selections[i]].site
										  ).odds[selectionList[selections[i]].name][
												getTeamIndex(index, matchup.homeTeam.team)
										  ]
										: 'n/a'}
								</Span>
							</StatDiv>
						</MiniGrid>
					) : (
						<Cell
							key={index}
							style={{
								gridRowStart: i + 2,
								gridColumnStart: index + 2,
								backgroundColor: index % 2 === 0 ? '#eee' : 'ccc',
							}}
						>
							<Span>
								{matchup.betting.sites.find(
									(site) => site.site_key === selectionList[selections[i]].site
								).odds[selectionList[selections[i]].name]
									? matchup.betting.sites.find(
											(site) =>
												site.site_key === selectionList[selections[i]].site
									  ).odds[selectionList[selections[i]].name][0]
									: 'n/a'}
							</Span>
						</Cell>
					);
				})
			);
		}
		return arr;
	};

	const handleSelectorChange = (e, i) => {
		const newSelections = [...selections];
		newSelections[i] = Number(e.target.value);
		setSelections(newSelections);
	};

	return (
		<BreakdownsDiv>
			<WideCell
				style={{
					position: 'absolute',
					left: '0',
					top: '0',
					margin: '0',
					display: 'flex',
					height: '3rem',
					background: 'white',
				}}
			>
				<span
					style={{
						cursor: 'pointer',
						fontWeight: 'bold',
						fontSize: '1rem',
						padding: '5px',
						border: '1px solid black',
						borderRadius: '5px',
						margin: '5px',
					}}
					onClick={toggleLayout}
				>
					{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}
				</span>
			</WideCell>
			{siteLayout === 'tile' && (
				<MatchupContainer>
					<div
						style={{
							position: 'absolute',
							top: '0',
							right: '0',
							margin: '1rem 2rem',
							padding: '1.3rem',
							textAlign: 'center',
						}}
					>
						<div>
							<span>Odds data site:</span>
						</div>
						<Selector
							value={oddsSnapshotSite}
							onChange={(e) => {
								setOddsSnapshotSite(e.target.value);
							}}
							style={{
								padding: '1.3rem',
								margin: '1rem',
								textAlign: 'center',
							}}
						>
							{Object.values(statNameAPI.sites).map((site, i) => {
								return (
									<option value={Object.keys(statNameAPI.sites)[i]}>
										{site}
									</option>
								);
							})}
						</Selector>
					</div>
					{matchups.map((matchup, index) => {
						return (
							<MatchupCard key={index}>
								<H3 style={{ display: 'inline' }}>
									(
									{/* each && statement is to test if that site's odds exist */}
									{matchup.betting.sites.find(
										(site) => site.site_key === oddsSnapshotSite
									) &&
										matchup.betting.sites.find(
											(site) => site.site_key === oddsSnapshotSite
										).odds.moneyLine[
											getTeamIndex(index, matchup.awayTeam.team)
										]}
									)
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
									(
									{matchup.betting.sites.find(
										(site) => site.site_key === oddsSnapshotSite
									).odds.moneyLine &&
										matchup.betting.sites.find(
											(site) => site.site_key === oddsSnapshotSite
										).odds.moneyLine[
											getTeamIndex(index, matchup.homeTeam.team)
										]}
									)
								</H3>
								<H2>{matchup.time.format('dddd MMM. Do, h:mma')}</H2>
								<H3>
									Spread: {abbTeam(matchup.awayTeam.team)}{' '}
									{matchup.betting.sites.find(
										(site) => site.site_key === oddsSnapshotSite
									).odds.spreads &&
										matchup.betting.sites.find(
											(site) => site.site_key === oddsSnapshotSite
										).odds.spreads[getTeamIndex(index, matchup.awayTeam.team)]}
									, {abbTeam(matchup.homeTeam.team)}{' '}
									{matchup.betting.sites.find(
										(site) => site.site_key === oddsSnapshotSite
									).odds.spreads &&
										matchup.betting.sites.find(
											(site) => site.site_key === oddsSnapshotSite
										).odds.spreads[getTeamIndex(index, matchup.homeTeam.team)]}
								</H3>
								<H3>
									O/U:{' '}
									{matchup.betting.sites.find(
										(site) => site.site_key === oddsSnapshotSite
									).odds.overUnder &&
										matchup.betting.sites.find(
											(site) => site.site_key === oddsSnapshotSite
										).odds.overUnder[0]}
								</H3>
							</MatchupCard>
						);
					})}
				</MatchupContainer>
			)}
			{siteLayout === 'grid' && (
				<Grid>
					{selections.map((sel, i) => {
						return (
							<WideCell
								style={{ gridRowStart: i + 2, gridColumnStart: 1 }}
								key={i}
							>
								<Selector
									onChange={(e) => handleSelectorChange(e, i)}
									value={sel}
								>
									{selectionList.map((item, ind) => {
										return (
											<option key={ind} value={ind}>
												{item.value}
											</option>
										);
									})}
								</Selector>
							</WideCell>
						);
					})}
					{matchups.map((matchup, i) => {
						return (
							<Cell
								key={i}
								style={{
									gridRowStart: 1,
									gridColumnStart: i + 2,
									background: '#2c2837',
									textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
									color: '#eee',
								}}
							>
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
