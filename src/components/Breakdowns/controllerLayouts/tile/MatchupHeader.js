import React from 'react';
import styled from 'styled-components';
import abbTeam from '../../../../tools/teamAbbreviations';

const MatchupHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 2px #222;

  .matchup-header-team {
    display: block;
    text-align: center;
  }

  .team-name {
    line-height: 2rem;
  }

  .record {
    font-weight: normal;
    font-size: 1rem;
  }

  .matchup-at {
    padding: 12px;
  }

  @media (max-width: 768px) {
    .team-name {
      font-size: 1.6rem;
    }
  }
`;

function MatchupHeader({ matchup, awayRecord, homeRecord }) {
  return (
    <MatchupHeaderContainer>
      <div className="matchup-header-team">
        <h1 className="team-name">{abbTeam(matchup.away_team)}</h1>
        <h3 className="record">{awayRecord}</h3>
      </div>
      <div className="matchup-at">
        <h1 className="team-name">@</h1>
      </div>
      <div className="matchup-header-team">
        <h1 className="team-name">{abbTeam(matchup.home_team)}</h1>
        <h3 className="record">{homeRecord}</h3>
      </div>
    </MatchupHeaderContainer>
  );
}

export default MatchupHeader;
