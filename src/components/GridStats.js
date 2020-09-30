import React from 'react';
import styled from 'styled-components';
import ComparisonGauge from './ComparisonGauge';

export const Cell = styled.div`
	display: flex;
	background: #ddd;
	width: var(--cell-width);
	text-align: center;
`;

export const MiniGrid = styled.div`
	background: #ddd;
	display: grid;
	width: var(--cell-width);
	grid-template-rows: 2fr 1fr;
	grid-template-columns: repeat(2, 1fr);
	border: 1px solid rgb(190, 190, 190);
`;

export const MiniGridNoBottom = styled(MiniGrid)`
	grid-template-rows: 1fr;
`;

export const StatDiv = styled.div`
	display: flex;
	padding: 4px 2px 0;
	width: calc(100% - 4px);
	margin: auto;
	text-align: center;
	align-items: center;
`;

export const GaugeContainer = styled.div`
	grid-column: 1 / 3;
	text-align: center;
	width: 100%;
`;

export const Span = styled.span`
	margin: auto;
`;

export default function GridStats(props) {
	const {
		matchups,
		selections,
		selectionList,
		rankings,
		getOddsData,
		oddsSnapshotSite,
	} = props.propList;

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
							backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
						}}
					>
						<StatDiv>
							<Span>{matchup.awayTeam[selectionList[selections[i]].name]}</Span>
						</StatDiv>
						<StatDiv>
							<Span>{matchup.homeTeam[selectionList[selections[i]].name]}</Span>
						</StatDiv>
						<GaugeContainer>
							{rankings !== {} && (
								<ComparisonGauge
									awayRank={
										rankings[selectionList[selections[i]].name] &&
										rankings[selectionList[selections[i]].name].find(
											(item) => item.team === matchup.awayTeam.team
										).rank
									}
									awayTeam={matchup.awayTeam.team}
									homeRank={
										rankings[selectionList[selections[i]].name] &&
										rankings[selectionList[selections[i]].name].find(
											(item) => item.team === matchup.homeTeam.team
										).rank
									}
									homeTeam={matchup.homeTeam.team}
								/>
							)}
						</GaugeContainer>
					</MiniGrid>
				) : selectionList[selections[i]].name !== 'overUnder' ? (
					<MiniGridNoBottom
						key={index}
						style={{
							gridRowStart: i + 2,
							gridColumnStart: index + 2,
							backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
						}}
					>
						<StatDiv>
							<Span>
								{/* check whether that data exists for the selected site */}
								{getOddsData(
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
									matchup,
									selectionList[selections[i]].name,
									oddsSnapshotSite,
									matchup.homeTeam.team
								)}
							</Span>
						</StatDiv>
					</MiniGridNoBottom>
				) : (
					<Cell
						key={index}
						style={{
							gridRowStart: i + 2,
							gridColumnStart: index + 2,
							backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
						}}
					>
						<Span>
							{getOddsData(
								matchup,
								selectionList[selections[i]].name,
								oddsSnapshotSite
							)}
						</Span>
					</Cell>
				);
			})
		);
	}
	return arr;
}
