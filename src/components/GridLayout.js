import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import GridStats from './GridStats';
import abbTeam from '../tools/teamAbbreviations';
import statNameAPI from '../tools/statNameAPI';
import { Container, CenteredDiv, ToggleLayoutButton } from './TileBanner';

const MainContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	overflow-x: auto;
	overflow-y: auto;
`;

const GridContainer = styled.div`
	display: flex;
	margin: 0.2rem;
	height: 100%;
	width: -moz-min-content;
	width: min-intrinsic;
	width: min-content;
`;

const FixedContainer = styled(Container)`
	margin: auto;
`;

const RelativeContainer = styled(Container)`
	position: absolute;
	left: 3%;
	bottom: 12px;
	margin-bottom: 0;
	@media (max-width: 900px) {
		position: inherit;
		margin: auto auto 0;
		left: initial;
	}
`;

const BannerDiv = styled.div`
	width: 100%;
	position: sticky;
	left: 0;
	margin: auto;
	display: flex;
	padding: 1rem;
	min-height: 7rem;
	border-bottom: 3px solid #ddd;
`;

const SelectorColumn = styled.div`
	display: flex;
	position: sticky;
	left: 0;
	padding-bottom: 1rem;
	height: -moz-min-content;
	height: min-intrinsic;
	height: min-content;
	gap: 5px;
	border-right: 4px solid rgba(20, 20, 20, 0.5);
	flex-direction: column;
	& > * {
		flex-basis: 52px;
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
	text-align: center;
	cursor: pointer;
`;

const StaticToggleLayoutButton = styled(ToggleLayoutButton)`
	display: flex;
`;

export const Grid = styled.div`
	display: grid;
	grid-auto-rows: 52px;
	height: -moz-min-content;
	height: min-intrinsic;
	height: min-content;
	padding: 0 1rem 1rem 0;
	gap: 5px;
	background-color: transparent;
	/* overflow-x: auto; */
	color: var(--betbro-blue);
`;

export const Selector = styled.select`
	font-size: 1rem;
	background: #2c2837;
	height: 100%;
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	@media (max-width: 600px) {
		font-size: 0.6rem;
	}
`;

const Cell = styled.div`
	display: flex;
	background: #ddd;
	height: 52px;
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
const SmallSpan = styled(Span)`
	font-size: 0.8rem;
`;

const Text = styled.span`
	margin: auto;
	font-size: 0.9rem;
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
		oddsLastUpdated,
	} = props.gridProps;
	return (
		<MainContainer>
			{/* render banner to switch view modes */}
			<BannerDiv>
				<RelativeContainer>
					Odds updated {moment(oddsLastUpdated).fromNow()}
				</RelativeContainer>
				<FixedContainer>
					<CenteredDiv>
						<Text>Click to switch view mode:</Text>
					</CenteredDiv>
					<StaticToggleLayoutButton onClick={toggleLayout}>
						<Text>{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}</Text>
					</StaticToggleLayoutButton>
				</FixedContainer>
			</BannerDiv>
			<GridContainer>
				<SelectorColumn>
					<WideCell
						style={{
							display: 'flex',
							background: 'var(--betbro-blue)',
							gridRowStart: '1',
							gridColumnStart: '1',
						}}
					>
						<label htmlFor='odds-selector' style={{ display: 'none' }}>
							Select book for odds data
						</label>
						<BannerSelector
							name='odds-selector'
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
							</WideCell>
						);
					})}
				</SelectorColumn>

				<Grid rows={selections.length}>
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
									flexDirection: 'column',
								}}
							>
								<Span>
									{`${abbTeam(matchup.awayTeam.team)} @ ${abbTeam(
										matchup.homeTeam.team
									)}`}
								</Span>
								<SmallSpan>
									{matchup.time.format('ddd MMM. Do, h:mma')}
								</SmallSpan>
							</Cell>
						);
					})}
					<GridStats propList={props.gridStatProps} />
				</Grid>
			</GridContainer>
		</MainContainer>
	);
}
