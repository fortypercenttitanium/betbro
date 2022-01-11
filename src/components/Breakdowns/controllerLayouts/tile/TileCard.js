import React from 'react';
import styled from 'styled-components';
import abbTeam from '../../../../tools/teamAbbreviations';
import format from 'date-fns/format';

const MatchupCard = styled.div`
  border-radius: 1rem;
  border: 1px solid #ddd;
  color: #ddd;
  background-color: rgba(44, 40, 55, 0.6);
  max-width: 320px;
  min-width: 210px;
  flex: 1 1;
  margin: 1rem;
  padding: 1rem;
  flex: 1;
  flex-basis: 17rem;
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

function TileCard({
  matchup,
  handleClick,
  sportsbook,
  index,
  homeRecord,
  awayRecord,
}) {
  const moneyLineData = matchup.moneyLine.find(
    (mlData) => mlData.site_key === sportsbook,
  );
  const spreadsData = matchup.spreads.find(
    (spreadData) => spreadData.site_key === sportsbook,
  );
  const overUnderData = matchup.overUnder.find(
    (ouData) => ouData.site_key === sportsbook,
  );
  return (
    <MatchupCard
      onClick={() => {
        handleClick(index);
      }}
      key={matchup.teams.toString()}
    >
      <h3 className="record" style={{ display: 'inline', marginRight: '3%' }}>
        {awayRecord}
      </h3>
      {'  '}
      <h1 className="team-name" style={{ display: 'inline' }}>
        {abbTeam(matchup.away_team)}
      </h1>{' '}
      <h1 className="team-name" style={{ display: 'inline' }}>
        @ {abbTeam(matchup.home_team)}
      </h1>
      {'  '}
      <h3 className="record" style={{ display: 'inline', marginLeft: '3%' }}>
        {homeRecord}
      </h3>
      <h2 className="matchup-time">
        {format(new Date(matchup.commence_time), 'EEE MMM Do, h:mma')}
      </h2>
      <p className="odds-name">Moneyline:</p>
      <p className="odds-data">
        {abbTeam(matchup.away_team)} {moneyLineData?.data.odds[1] || 'n/a'},{' '}
        {abbTeam(matchup.home_team)} {moneyLineData?.data.odds[0] || 'n/a'}
      </p>
      <p className="odds-name">Spread:</p>
      <p className="odds-data">
        {abbTeam(matchup.away_team)} {spreadsData?.data.points[1] || 'n/a'}{' '}
        {spreadsData && `(${spreadsData?.data.odds[1]})`},{' '}
        {abbTeam(matchup.home_team)} {spreadsData?.data.points[0] || 'n/a'}{' '}
        {spreadsData && `(${spreadsData?.data.odds[0]})`}
      </p>
      <p className="odds-name">Over/Under:</p>
      <p className="odds-data">
        Over {overUnderData?.data.points || 'n/a'}{' '}
        {overUnderData && `(${overUnderData?.data.odds[0]})`}, Under{' '}
        {overUnderData?.data.points || 'n/a'}{' '}
        {overUnderData && `(${overUnderData?.data.odds[1]})`}
      </p>
    </MatchupCard>
  );
}

export default TileCard;
