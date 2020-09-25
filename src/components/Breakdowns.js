import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import selectionList from '../tools/selectionList';
import LoadingScreen from './LoadingScreen';
import TileBanner from './TileBanner';
import GridLayout from './GridLayout';
import TileLayout from './TileLayout';
import TileDetailedView from './TileDetailedView';
// const weeks = require('../tools/weeks');
// const thisWeek = weeks.thisWeek();

const BreakdownsDiv = styled.div`
	display: flex;
	position: relative;
	margin: 0;
	height: 100%;
	width: 100%;
`;

const MatchupContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 80%;
	max-width: 1000px;
	align-items: center;
	text-align: center;
`;

export default function Breakdowns(props) {
	const {
		selections,
		setSelections,
		matchups,
		rankings,
		records,
		setHeadline,
	} = props.propList;

	const [oddsSnapshotSite, setOddsSnapshotSite] = useState('draftkings');
	const [siteLayout, setSiteLayout] = useState('grid');
	const [tileDetailedView, setTileDetailedView] = useState(null);

	const getTeamIndex = (matchupIndex, team) => {
		const odds = matchups[matchupIndex].betting;
		return odds.teams.indexOf(team);
	};

	const toggleLayout = () => {
		setSiteLayout(siteLayout === 'grid' ? 'tile' : 'grid');
	};

	const getOddsData = (matchup, type, site, team = null) => {
		if (
			matchup.betting.sites.find((item) => item.site_key === site) &&
			matchup.betting.sites.find((item) => item.site_key === site).odds[type]
		) {
			return type !== 'overUnder'
				? matchup.betting.sites.find((item) => item.site_key === site).odds[
						type
				  ][getTeamIndex(matchups.indexOf(matchup), team)]
				: matchup.betting.sites.find((item) => item.site_key === site).odds[
						type
				  ][0];
		} else {
			return 'n/a';
		}
	};

	useEffect(() => {
		setHeadline(`breakdowns`);
	}, [setHeadline]);

	const handleSelectorChange = (e, i) => {
		const newSelections = [...selections];
		newSelections[i] = Number(e.target.value);
		setSelections(newSelections);
	};
	const bannerProps = {
		siteLayout,
		toggleLayout,
		oddsSnapshotSite,
		setOddsSnapshotSite,
	};

	const gridStatProps = {
		matchups,
		selections,
		selectionList,
		rankings,
		getOddsData,
		oddsSnapshotSite,
	};

	const gridProps = {
		siteLayout,
		toggleLayout,
		selections,
		selectionList,
		handleSelectorChange,
		matchups,
		oddsSnapshotSite,
		setOddsSnapshotSite,
	};

	const tileProps = {
		matchups,
		getOddsData,
		oddsSnapshotSite,
		records,
		setTileDetailedView,
	};

	const tileDetailProps = {
		tileDetailedView,
		setTileDetailedView,
		selectionList,
		selections,
		getOddsData,
		rankings,
		handleSelectorChange,
		matchups,
	};

	return (
		<BreakdownsDiv>
			{!matchups.length && <LoadingScreen />}
			{tileDetailedView !== null && (
				<TileDetailedView propsList={tileDetailProps} />
			)}
			{siteLayout === 'tile' && (
				<MatchupContainer>
					<TileBanner propsList={bannerProps} />
					<TileLayout propsList={tileProps} />
				</MatchupContainer>
			)}
			{siteLayout === 'grid' && (
				<GridLayout gridProps={gridProps} gridStatProps={gridStatProps} />
			)}
		</BreakdownsDiv>
	);
}
