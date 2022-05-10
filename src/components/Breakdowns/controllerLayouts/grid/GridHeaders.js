import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import abbTeam from '../../../../tools/teamAbbreviations';
import { Cell } from '../sharedStyles';

const HeaderCell = styled(Cell)`
  background: #2c2837;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  color: #eee;
  flex-direction: column;
  grid-row-start: 1;
  grid-column-start: ${({ index }) => index + 2};

  .matchup-title {
    font-size: 1.3rem;
    margin: auto;
  }

  .matchup-time {
    font-size: 0.8rem;
  }
`;

function getAwayTeam(matchup) {
  const awayTeam = matchup.teams.filter((team) => team !== matchup.home_team);

  if (awayTeam.length > 1) {
    throw new Error(
      `Error in matchup: ${matchup.teams[0]} vs. ${matchup.teams[1]}. Cannot determine home and away team.`,
    );
  }

  return awayTeam[0];
}
function GridHeaders({ matchups }) {
  return matchups.map((matchup, i) => {
    return (
      <HeaderCell key={matchup.home_team} index={i}>
        <h1 className="matchup-title">
          {`${abbTeam(getAwayTeam(matchup))} @ ${abbTeam(matchup.home_team)}`}
        </h1>
        <p className="matchup-time">
          {format(new Date(matchup.commence_time), 'EEE MMM do, h:mma')}
        </p>
      </HeaderCell>
    );
  });
}

export default GridHeaders;
