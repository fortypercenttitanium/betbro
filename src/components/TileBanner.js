import React from 'react';
import styled from 'styled-components';
import statNameAPI from '../tools/statNameAPI';

const BannerDiv = styled.div`
	width: 80%;
	display: flex;
	padding: 1rem;
	height: 7rem;
`;

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	text-align: center;
`;

const ToggleLayoutButton = styled.div`
	margin: auto;
	padding: 1rem;
	cursor: pointer;
	transition: 0.3s;
	background-color: rgba(44, 40, 55, 0.6);
	color: #ddd;
	text-align: center;
	border: 1px solid #ddd;
	border-radius: 5px;
	&:hover {
		background-color: #ddd;
		color: var(--betbro-blue);
		transition: 0.3s;
	}
`;

const Text = styled.span`
	margin: auto;
	font-size: 1.2rem;
`;

const CenteredDiv = styled.div`
	margin: auto;
`;

const BannerSelector = styled.select`
	margin: auto;
	font-size: 1rem;
	background: var(--betbro-blue);
	color: #eee;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	border-radius: 5px;
	padding: 1rem;
	text-align: center;
	cursor: pointer;
`;

export default function TileBanner(props) {
	const {
		oddsSnapshotSite,
		setOddsSnapshotSite,
		siteLayout,
		toggleLayout,
	} = props.propsList;
	return (
		<BannerDiv>
			<Container>
				<CenteredDiv>
					<Text>Click to switch view mode:</Text>
				</CenteredDiv>
				<ToggleLayoutButton onClick={toggleLayout}>
					<Text>{siteLayout === 'grid' ? 'Tile mode' : 'Grid mode'}</Text>
				</ToggleLayoutButton>
			</Container>
			<Container>
				<CenteredDiv>
					<Text>Odds data site:</Text>
				</CenteredDiv>
				<BannerSelector
					value={oddsSnapshotSite}
					onChange={(e) => {
						setOddsSnapshotSite(e.target.value);
					}}
				>
					{Object.values(statNameAPI.sites).map((site, i) => {
						return (
							<option key={i} value={Object.keys(statNameAPI.sites)[i]}>
								{site}
							</option>
						);
					})}
				</BannerSelector>
			</Container>
		</BannerDiv>
	);
}
