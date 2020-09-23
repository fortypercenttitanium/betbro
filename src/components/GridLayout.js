import React from 'react';
import styled from 'styled-components';
import GridStats from './GridStats';
import abbTeam from '../tools/teamAbbreviations';

export const Grid = styled.div`
	display: grid;
	margin: 0.2rem;
	grid-auto-rows: 45px;
	gap: 5px;
	background-color: white;
	overflow: auto;
	height: 100%;
`;

export const Selector = styled.select`
	font-size: 1rem;
	background: #2c2837;
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	@media (max-width: 600px) {
		font-size: 0.6rem;
	}
`;

const Cell = styled.div`
	display: flex;
	background: #ddd;
	width: 120px;
	text-align: center;
`;

export const WideCell = styled(Cell)`
	width: auto;
`;

const Span = styled.span`
	margin: auto;
`;

const ToggleLayoutButton = styled.div`
	margin: auto;
	padding: 0.5rem;
	cursor: pointer;
	text-align: center;
	border: 1px solid black;
	border-radius: 5px;
	&:hover {
		background: #222;
		color: #ddd;
	}
`;

const Text = styled.span`
	margin: auto;
	font-size: 1rem;
`;

export default function GridLayout(props) {
	const {
		siteLayout,
		toggleLayout,
		selections,
		selectionList,
		handleSelectorChange,
		matchups,
	} = props.gridProps;
	return (
		<Grid>
			<WideCell
				style={{
					display: 'flex',
					height: '3rem',
					background: 'white',
					gridRowStart: '1',
					gridColumnStart: '1',
				}}
			>
				<Text>Click to switch view mode:</Text>
				<ToggleLayoutButton onClick={toggleLayout}>
					<Text>{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}</Text>
				</ToggleLayoutButton>
			</WideCell>
			{/* render selectors on left */}
			{selections.map((sel, i) => {
				return (
					<WideCell style={{ gridRowStart: i + 2, gridColumnStart: 1 }} key={i}>
						<Selector onChange={(e) => handleSelectorChange(e, i)} value={sel}>
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
			{/* render matchup headers */}
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
			<GridStats propList={props.gridStatProps} />
		</Grid>
	);
}
