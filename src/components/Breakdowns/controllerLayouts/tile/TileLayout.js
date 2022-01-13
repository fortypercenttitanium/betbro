import React, { useState } from 'react';
import styled from 'styled-components';
import TileCard from './TileCard';
import TileDetails from './TileDetails';

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
  selectionList,
  handleChangeStatSelections,
}) {
  const [tileDetails, setTileDetails] = useState(null);

  const handleClick = (index) => {
    setTileDetails(matchups[index]);
  };

  const handleClose = () => {
    setTileDetails(null);
  };

  return (
    <MainContainer>
      {tileDetails && (
        <TileDetails
          tileDetails={tileDetails}
          stats={stats}
          sportsbook={sportsbook}
          statSelections={statSelections}
          handleChangeStatSelections={handleChangeStatSelections}
          selectionList={selectionList}
          handleClose={handleClose}
        />
      )}
      {matchups.map((matchup, index) => {
        const homeRecord = stats[matchup.home_team].record.record.value;
        const awayRecord = stats[matchup.away_team].record.record.value;
        return (
          <TileCard
            key={`${matchup.away_team} @ ${matchup.home_team}`}
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
