import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import abbTeam from '../../../../tools/teamAbbreviations';
import MatchupHeader from './MatchupHeader';

const MatchupCard = styled.div`
  border-radius: 16px;
  border: 1px solid #ddd;
  color: #ddd;
  background-color: rgba(44, 40, 55, 0.9);
  padding: 16px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
    color: var(--betbro-blue);
    transition: 0.3s;
    & > h1 {
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .matchup-time {
    font-size: 1.2rem;
    font-weight: normal;
  }

  .odds-container {
    line-height: 1.3;
    padding: 4px;
  }

  .odds-name {
    font-weight: bold;
    font-size: 1.1rem;
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
      <MatchupHeader
        matchup={matchup}
        homeRecord={homeRecord}
        awayRecord={awayRecord}
      />

      <h2 className="matchup-time">
        {format(new Date(matchup.commence_time), 'EEE MMM Do, h:mma')}
      </h2>
      <div className="odds-container">
        <p className="odds-name">Moneyline:</p>
        <p className="odds-data">
          {abbTeam(matchup.away_team)} {moneyLineData?.data.odds[1] || 'n/a'},{' '}
          {abbTeam(matchup.home_team)} {moneyLineData?.data.odds[0] || 'n/a'}
        </p>
      </div>

      <div className="odds-container">
        <p className="odds-name">Spread:</p>
        <p className="odds-data">
          {abbTeam(matchup.away_team)} {spreadsData?.data.points[1] || 'n/a'}{' '}
          {spreadsData && `(${spreadsData?.data.odds[1]})`}
        </p>
        <p className="odds-data">
          {abbTeam(matchup.home_team)} {spreadsData?.data.points[0] || 'n/a'}{' '}
          {spreadsData && `(${spreadsData?.data.odds[0]})`}
        </p>
      </div>

      <div className="odds-container">
        <p className="odds-name">Over/Under:</p>
        <p className="odds-data">
          Over {overUnderData?.data.points || 'n/a'}{' '}
          {overUnderData && `(${overUnderData?.data.odds[0]})`}
        </p>
        <p className="odds-data">
          Under {overUnderData?.data.points || 'n/a'}{' '}
          {overUnderData && `(${overUnderData?.data.odds[1]})`}
        </p>
      </div>
    </MatchupCard>
  );
}

export default TileCard;
