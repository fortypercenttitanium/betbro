import React, { useState } from 'react';
import styled from 'styled-components';
import TileCard from './TileCard';

const MainContainer = styled.div`
  display: grid;
  width: clamp(800px, 95%, 1200px);
  padding: 10px 24px;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px 8px;
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
    <MainContainer>
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
    </MainContainer>
  );
}
