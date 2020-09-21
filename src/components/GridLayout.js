import React from 'react';
import styled from 'styled-components';
import GridStats from './GridStats';
import abbTeam from '../tools/teamAbbreviations';

const Grid = styled.div`
	display: grid;
	margin: 0.2rem;
	grid-auto-rows: 45px;
	gap: 5px;
	background-color: white;
	overflow: auto;
	height: 100%;
`;

const Selector = styled.select`
	font-size: 1rem;
	background: #2c2837;
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
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

const Span = styled.span`
	margin: auto;
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
