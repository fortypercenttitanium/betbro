import React, { useState } from 'react';
import styled from 'styled-components';
import TileCard from './TileCard';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const TileContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0.2rem auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  overflow-y: auto;
`;

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
    font-size: 0.75rem;
  }
`;

const SmallSpan = styled.span`
  font-size: 1rem;
  font-weight: normal;
  margin: auto;
  padding: 3px 0;
  @media (max-width: 900px) {
    font-size: 0.6rem;
  }
`;

export default function TileLayout({
  sportsbook,
  stats,
  matchups,
  statSelections,
  setStatSelections,
  selectionList,
  handleChangeStatSelections,
}) {
  const [tileDetails, setTileDetails] = useState(null);

  const handleClick = (index) => {
    setTileDetails(matchups[index]);
  };

  return (
    <TileContainer>
      {matchups.map((matchup, index) => {
        const homeRecord = stats[matchup.home_team].record.record.value;
        const awayRecord = stats[matchup.away_team].record.record.value;
        return (
          <TileCard
            handleClick={handleClick}
            index={index}
            matchup={matchup}
            sportsbook={sportsbook}
            homeRecord={homeRecord}
            awayRecord={awayRecord}
          />
        );
      })}
    </TileContainer>
  );
}
