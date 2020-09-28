import React from 'react';
import styled from 'styled-components';
import abbTeam from '../tools/teamAbbreviations';

const TileContainer = styled.div`
	display: flex;
	width: 100%;
	margin: 0 auto;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	cursor: pointer;
`;

const MatchupCard = styled.div`
	border-radius: 1rem;
	border: 1px solid #ddd;
	color: #ddd;
	background-color: rgba(44, 40, 55, 0.6);
	max-width: 320px;
	flex: 1 1;
	margin: 1rem;
	padding: 1rem;
	flex: 1;
	flex-basis: 16rem;
	text-align: center;
	transition: 0.3s;
	&:hover {
		background-color: #ddd;
		color: var(--betbro-blue);
		transition: 0.3s;
		& > h1 {
			text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
		}
	}
	@media (max-width: 900px) {
		flex-basis: 11rem;
	}
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 1.4rem;
	padding: 3px 0;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
	@media (max-width: 900px) {
		font-size: 1.3rem;
	}
`;

const H2 = styled.h2`
	font-size: 1.2rem;
	font-weight: normal;
	padding: 3px 0;
	@media (max-width: 900px) {
		font-size: 1rem;
	}
`;

const H3 = styled.h3`
	font-size: 1rem;
	font-weight: normal;
	margin: auto;
	padding: 3px 0;
	@media (max-width: 900px) {
		font-size: 0.6rem;
	}
`;

export default function TileLayout(props) {
	const {
		matchups,
		getOddsData,
		oddsSnapshotSite,
		records,
		setTileDetailedView,
	} = props.propsList;

	const handleClick = (matchup) => {
		setTileDetailedView(matchups.indexOf(matchup));
	};
	return (
		<TileContainer>
			{matchups.map((matchup, index) => {
				return (
					<MatchupCard
						onClick={() => {
							handleClick(matchup);
						}}
						key={index}
					>
						<H3 style={{ display: 'inline', marginRight: '%' }}>
							{records[matchup.awayTeam.team]}
						</H3>
						{'  '}
						<H1 style={{ display: 'inline' }}>
							{abbTeam(matchup.awayTeam.team)}
						</H1>{' '}
						<H1 style={{ display: 'inline' }}>
							@ {abbTeam(matchup.homeTeam.team)}
						</H1>
						{'  '}
						<H3 style={{ display: 'inline', marginLeft: '%' }}>
							{records[matchup.homeTeam.team]}
						</H3>
						<H2>{matchup.time.format('dddd MMM. Do, h:mma')}</H2>
						<H3>
							Moneyline: {abbTeam(matchup.awayTeam.team)}{' '}
							{getOddsData(
								matchup,
								'moneyLine',
								oddsSnapshotSite,
								matchup.awayTeam.team
							)}
							, {abbTeam(matchup.homeTeam.team)}{' '}
							{getOddsData(
								matchup,
								'moneyLine',
								oddsSnapshotSite,
								matchup.homeTeam.team
							)}
						</H3>
						<H3>
							Spread: {abbTeam(matchup.awayTeam.team)}{' '}
							{getOddsData(
								matchup,
								'spreads',
								oddsSnapshotSite,
								matchup.awayTeam.team
							)}
							, {abbTeam(matchup.homeTeam.team)}{' '}
							{getOddsData(
								matchup,
								'spreads',
								oddsSnapshotSite,
								matchup.homeTeam.team
							)}
						</H3>
						<H3>O/U: {getOddsData(matchup, 'overUnder', oddsSnapshotSite)}</H3>
					</MatchupCard>
				);
			})}
		</TileContainer>
	);
}
