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
	margin: auto;
	padding: 2.5rem;
`;

const TileWideCell = styled(WideCell)`
	width: 100%;
`;

const DetailedViewContainer = styled.div`
	height: 80%;
	margin: auto;
	overflow-y: auto;
	border: 1px solid #ddd;
	border-radius: 5px;
	/* padding: 2.5rem 0 2.5rem 2.5rem; */
	background-color: rgba(0, 0, 0, 0.7);
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
		oddsSnapshotSite,
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
									<label htmlFor='data-selector' style={{ display: 'none' }}>
										Select data to display
									</label>
									<Selector
										name='data-selector'
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
							) : selectionList[sel].name === 'moneyLine' ? (
								<MiniGridNoBottom
									key={i}
									style={{
										gridRowStart: i + 2,
										gridColumnStart: 2,
										backgroundColor: '#eee',
									}}
								>
									<StatDiv>
										<Span>
											{/* check whether that data exists for the selected site */}
											{getOddsData(
												matchups,
												matchup,
												selectionList[selections[i]].name,
												oddsSnapshotSite,
												matchup.awayTeam.team
											)}
										</Span>
									</StatDiv>
									<StatDiv>
										<Span>
											{getOddsData(
												matchups,
												matchup,
												selectionList[selections[i]].name,
												oddsSnapshotSite,
												matchup.homeTeam.team
											)}
										</Span>
									</StatDiv>
								</MiniGridNoBottom>
							) : selectionList[sel].name === 'spreads' ? (
								<MiniGridNoBottom
									key={i}
									style={{
										gridRowStart: i + 2,
										gridColumnStart: 2,
										backgroundColor: '#eee',
									}}
								>
									<StatDiv
										style={{ padding: '0', margin: '0 auto', height: '100%' }}
									>
										<Span>
											{/* check whether that data exists for the selected site */}
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite,
													matchup.awayTeam.team
												).points
											}
											<br />(
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite,
													matchup.awayTeam.team
												).odds
											}
											)
										</Span>
									</StatDiv>
									<StatDiv
										style={{ padding: '0', margin: '0 auto', height: '100%' }}
									>
										<Span>
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite,
													matchup.homeTeam.team
												).points
											}
											<br />(
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite,
													matchup.homeTeam.team
												).odds
											}
											)
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
									<div style={{ width: '100%' }}>
										<Span>
											<strong>
												{
													getOddsData(
														matchups,
														matchup,
														selectionList[selections[i]].name,
														oddsSnapshotSite
													).points
												}
											</strong>
										</Span>
										<br />
										<Span>
											U:{' '}
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite
												).oddsUnder
											}
											{'  '}|
										</Span>

										<Span>
											{' '}
											O:{' '}
											{
												getOddsData(
													matchups,
													matchup,
													selectionList[selections[i]].name,
													oddsSnapshotSite
												).oddsOver
											}
										</Span>
									</div>
								</Cell>
							);

							// selectionList[sel].name !== 'overUnder' ? (
							// 	<MiniGridNoBottom
							// 		key={i}
							// 		style={{
							// 			gridRowStart: i + 2,
							// 			gridColumnStart: 2,
							// 			backgroundColor: 'eee',
							// 		}}
							// 	>
							// 		<StatDiv>
							// 			<Span>
							// 				{/* check whether that data exists for the selected site */}
							// 				{getOddsData(
							// 					matchups,
							// 					matchup,
							// 					selectionList[selections[i]].name,
							// 					oddsSnapshotSite,
							// 					matchup.awayTeam.team
							// 				)}
							// 			</Span>
							// 		</StatDiv>
							// 		<StatDiv>
							// 			<Span>
							// 				{getOddsData(
							// 					matchups,
							// 					matchup,
							// 					selectionList[selections[i]].name,
							// 					oddsSnapshotSite,
							// 					matchup.homeTeam.team
							// 				)}
							// 			</Span>
							// 		</StatDiv>
							// 	</MiniGridNoBottom>
							// ) : (
							// 	<Cell
							// 		key={i}
							// 		style={{
							// 			gridRowStart: i + 2,
							// 			gridColumnStart: 2,
							// 			backgroundColor: '#eee',
							// 		}}
							// 	>
							// 		<Span>
							// 			{getOddsData(
							// 				matchups,
							// 				matchup,
							// 				selectionList[selections[i]].name,
							// 				oddsSnapshotSite
							// 			)}
							// 		</Span>
							// 	</Cell>
							// );
						})}
					</TileGrid>
				</DetailedViewContainer>
			</Background>
		)
	);
}
