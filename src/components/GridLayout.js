import React from 'react';
import styled from 'styled-components';
import GridStats from './GridStats';
import abbTeam from '../tools/teamAbbreviations';
import statNameAPI from '../tools/statNameAPI';

const MainContainer = styled.div`
	height: 99%;
	display: flex;
	margin: 0.2rem;
	overflow-x: hidden;
`;

const SelectorColumn = styled.div`
	display: flex;
	gap: 5px;
	border-right: 8px solid transparent;
	height: 100%;
	flex-direction: column;
	& > * {
		flex-basis: 48px;
	}
`;
const BannerSelector = styled.select`
	margin: auto;
	font-size: 0.8rem;
	background: var(--betbro-blue);
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	border-radius: 5px;
	padding: 0.5rem;
	width: 50%;
	text-align: center;
	cursor: pointer;
`;

export const Grid = styled.div`
	display: grid;
	grid-auto-rows: 48px;
	gap: 5px;
	background-color: transparent;
	overflow: auto;
	height: 100%;
	color: var(--betbro-blue);
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
	width: var(--cell-width);
	text-align: center;
`;

export const WideCell = styled(Cell)`
	width: auto;
`;

const Span = styled.span`
	font-size: 1.3rem;
	margin: auto;
`;

const ToggleLayoutButton = styled.div`
	margin: auto;
	padding: 0.5rem;
	cursor: pointer;
	text-align: center;
	border: 1px solid black;
	border-radius: 5px;
	transition: 0.3s;
	&:hover {
		background: #ddd;
		transition: 0.3s;
		& > span {
			color: #222;
		}
	}
`;

const Text = styled.span`
	margin: auto;
	font-size: 1rem;
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
`;

export default function GridLayout(props) {
	const {
		siteLayout,
		toggleLayout,
		selections,
		selectionList,
		handleSelectorChange,
		matchups,
		oddsSnapshotSite,
		setOddsSnapshotSite,
	} = props.gridProps;
	return (
		<MainContainer>
			<SelectorColumn>
				<WideCell
					style={{
						display: 'flex',
						height: '3rem',
						background: 'var(--betbro-blue)',
						gridRowStart: '1',
						gridColumnStart: '1',
					}}
				>
					<ToggleLayoutButton onClick={toggleLayout}>
						<Text>{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}</Text>
					</ToggleLayoutButton>
					<BannerSelector
						value={oddsSnapshotSite}
						onChange={(e) => {
							setOddsSnapshotSite(e.target.value);
						}}
					>
						{Object.values(statNameAPI.sites).map((site, i) => {
							return (
								<option key={i} value={Object.keys(statNameAPI.sites)[i]}>
									Book: {site}
								</option>
							);
						})}
					</BannerSelector>
				</WideCell>
				{/* render selectors on left */}
				{selections.map((sel, i) => {
					return (
						<WideCell key={i}>
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
			</SelectorColumn>
			<Grid>
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
		</MainContainer>
	);
}
