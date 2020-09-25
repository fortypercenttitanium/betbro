import React from 'react';
import styled from 'styled-components';
import { Background } from './LoadingScreen';
import { Grid, WideCell, Selector } from './GridLayout';
import {
	Cell,
	MiniGrid,
	MiniGridNoBottom,
	StatDiv,
	Span,
	GaugeContainer,
} from './GridStats';
import ComparisonGauge from './ComparisonGauge';
import abbTeam from '../tools/teamAbbreviations';

const TileGrid = styled(Grid)`
	height: 100%;
	width: 100%;
`;

const TileWideCell = styled(WideCell)`
	width: 100%;
`;

const DetailedViewContainer = styled.div`
	margin: auto;
`;

export default function TileDetailedView(props) {
	const {
		tileDetailedView,
		setTileDetailedView,
		selectionList,
		selections,
		getOddsData,
		rankings,
		handleSelectorChange,
		matchups,
	} = props.propsList;

	const matchup = matchups[tileDetailedView];
	return (
		tileDetailedView !== null && (
			<Background onClick={() => setTileDetailedView(null)}>
				<DetailedViewContainer onClick={(e) => e.stopPropagation()}>
					<TileGrid>
						{/* render the selectors just like in grid layout */}
						{selections.map((sel, i) => {
							return (
								<TileWideCell
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
								</TileWideCell>
							);
						})}
						{/* render matchup header */}
						{matchup !== null && (
							<Cell
								style={{
									gridRowStart: 1,
									gridColumnStart: 2,
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
						)}

						{/* render the rest of stats */}
						{selections.map((sel, i) => {
							return selectionList[sel].category === 'stats' ? (
								<MiniGrid
									key={i}
									style={{
										gridRowStart: i + 2,
										gridColumnStart: 2,
										backgroundColor: '#eee',
									}}
								>
									<StatDiv>
										<Span>{matchup.awayTeam[selectionList[sel].name]}</Span>
									</StatDiv>
									<StatDiv>
										<Span>{matchup.homeTeam[selectionList[sel].name]}</Span>
									</StatDiv>
									<GaugeContainer>
										{rankings !== {} && (
											<ComparisonGauge
												awayRank={
													rankings[selectionList[sel].name] &&
													rankings[selectionList[sel].name].find(
														(item) => item.team === matchup.awayTeam.team
													).rank
												}
												awayTeam={matchup.awayTeam.team}
												homeRank={
													rankings[selectionList[sel].name] &&
													rankings[selectionList[sel].name].find(
														(item) => item.team === matchup.homeTeam.team
													).rank
												}
												homeTeam={matchup.homeTeam.team}
											/>
										)}
									</GaugeContainer>
								</MiniGrid>
							) : selectionList[sel].name !== 'overUnder' ? (
								<MiniGridNoBottom
									key={i}
									style={{
										gridRowStart: i + 2,
										gridColumnStart: 2,
										backgroundColor: 'eee',
									}}
								>
									<StatDiv>
										<Span>
											{/* check whether that data exists for the selected site */}
											{getOddsData(
												matchup,
												selectionList[sel].name,
												selectionList[sel].site,
												matchup.awayTeam.team
											)}
										</Span>
									</StatDiv>
									<StatDiv>
										<Span>
											{getOddsData(
												matchup,
												selectionList[sel].name,
												selectionList[sel].site,
												matchup.homeTeam.team
											)}
										</Span>
									</StatDiv>
								</MiniGridNoBottom>
							) : (
								<Cell
									key={i}
									style={{
										gridRowStart: i + 2,
										gridColumnStart: 2,
										backgroundColor: '#eee',
									}}
								>
									<Span>
										{getOddsData(
											matchup,
											selectionList[sel].name,
											selectionList[sel].site
										)}
									</Span>
								</Cell>
							);
						})}
					</TileGrid>
				</DetailedViewContainer>
			</Background>
		)
	);
}
