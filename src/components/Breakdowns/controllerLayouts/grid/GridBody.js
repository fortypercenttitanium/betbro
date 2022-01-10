import React from 'react';
import styled from 'styled-components';
import ComparisonGauge from '../ComparisonGauge';
import selectionList from '../../../../tools/namingLibrary/selectionList';
import {
  StatsCell,
  OverUnderCell,
  SpreadsCell,
  MoneyLineCell,
} from './cells/cells';

export const Cell = styled.div`
  display: flex;
  background: #ddd;
  width: var(--cell-width);
  text-align: center;
`;

export const MiniGrid = styled.div`
  background: #ddd;
  display: grid;
  width: var(--cell-width);
  grid-template-rows: 2fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid rgb(190, 190, 190);
`;

export const MiniGridNoBottom = styled(MiniGrid)`
  grid-template-rows: 1fr;
`;

export const StatDiv = styled.div`
  display: flex;
  padding: 4px 2px 0;
  width: calc(100% - 4px);
  margin: auto;
  text-align: center;
  align-items: center;
`;

export const GaugeContainer = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  width: 100%;
`;

export const Span = styled.span`
  margin: auto;
`;

// Higher-order component to render the cell with the correct styling and data
function StatCellType({
  row,
  matchup,
  column,
  selection,
  homeTeamStats,
  awayTeamStats,
  sportsbook,
}) {
  switch (selection.name) {
    case 'spreads':
      return (
        <SpreadsCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    case 'moneyLine':
      return (
        <MoneyLineCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    case 'overUnder':
      return (
        <OverUnderCell
          sportsbook={sportsbook}
          row={row}
          matchup={matchup}
          column={column}
          selection={selection.name}
        />
      );
    default:
      return (
        <StatsCell
          row={row}
          matchup={matchup}
          column={column}
          selection={selection}
          homeTeamStats={homeTeamStats}
          awayTeamStats={awayTeamStats}
        />
      );
  }
}

export default function GridBody({
  matchups,
  statSelections,
  stats,
  sportsbook,
}) {
  const gridRender = matchups.map((matchup, column) => {
    const { home_team, away_team } = matchup;
    const homeTeamStats = stats[home_team];
    const awayTeamStats = stats[away_team];

    return statSelections.map((selection, row) => (
      <StatCellType
        key={`${row} - ${selection.category}: ${selection.name}`}
        row={row}
        matchup={matchup}
        column={column}
        selection={selection}
        homeTeamStats={homeTeamStats}
        awayTeamStats={awayTeamStats}
        sportsbook={sportsbook}
      />
    ));
  });

  return gridRender;

  // for (let i = 0; i < statSelections.length; i++) {
  //   arr.push(
  //     matchups.map((matchup, index) => {
  //       return selectionList[statSelections[i]].category === 'stats' ? (
  //         <MiniGrid
  //           key={index}
  //           style={{
  //             gridRowStart: i + 2,
  //             gridColumnStart: index + 2,
  //             backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
  //           }}
  //         >
  //           <StatDiv>
  //             <Span>
  //               {matchup.awayTeam[selectionList[statSelections[i]].name]}
  //             </Span>
  //           </StatDiv>
  //           <StatDiv>
  //             <Span>
  //               {matchup.homeTeam[selectionList[statSelections[i]].name]}
  //             </Span>
  //           </StatDiv>
  //           <GaugeContainer>
  //             {rankings !== {} && (
  //               <ComparisonGauge
  //                 awayRank={
  //                   rankings[selectionList[statSelections[i]].name] &&
  //                   rankings[selectionList[statSelections[i]].name].find(
  //                     (item) => item.team === matchup.awayTeam.team,
  //                   ).rank
  //                 }
  //                 awayTeam={matchup.awayTeam.team}
  //                 homeRank={
  //                   rankings[selectionList[statSelections[i]].name] &&
  //                   rankings[selectionList[statSelections[i]].name].find(
  //                     (item) => item.team === matchup.homeTeam.team,
  //                   ).rank
  //                 }
  //                 homeTeam={matchup.homeTeam.team}
  //               />
  //             )}
  //           </GaugeContainer>
  //         </MiniGrid>
  //       ) : selectionList[statSelections[i]].name === 'moneyLine' ? (
  //         <MiniGridNoBottom
  //           key={index}
  //           style={{
  //             gridRowStart: i + 2,
  //             gridColumnStart: index + 2,
  //             backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
  //           }}
  //         >
  //           <StatDiv>
  //             <Span>
  //               {/* check whether that data exists for the selected site */}
  //               {getOddsData(
  //                 matchups,
  //                 matchup,
  //                 selectionList[statSelections[i]].name,
  //                 oddsSnapshotSite,
  //                 matchup.awayTeam.team,
  //               )}
  //             </Span>
  //           </StatDiv>
  //           <StatDiv>
  //             <Span>
  //               {getOddsData(
  //                 matchups,
  //                 matchup,
  //                 selectionList[statSelections[i]].name,
  //                 oddsSnapshotSite,
  //                 matchup.homeTeam.team,
  //               )}
  //             </Span>
  //           </StatDiv>
  //         </MiniGridNoBottom>
  //       ) : selectionList[statSelections[i]].name === 'spreads' ? (
  //         <MiniGridNoBottom
  //           key={index}
  //           style={{
  //             gridRowStart: i + 2,
  //             gridColumnStart: index + 2,
  //             backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
  //           }}
  //         >
  //           <StatDiv>
  //             <Span>
  //               {/* check whether that data exists for the selected site */}
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                   matchup.awayTeam.team,
  //                 ).points
  //               }
  //               <br />(
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                   matchup.awayTeam.team,
  //                 ).odds
  //               }
  //               )
  //             </Span>
  //           </StatDiv>
  //           <StatDiv>
  //             <Span>
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                   matchup.homeTeam.team,
  //                 ).points
  //               }
  //               <br />(
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                   matchup.homeTeam.team,
  //                 ).odds
  //               }
  //               )
  //             </Span>
  //           </StatDiv>
  //         </MiniGridNoBottom>
  //       ) : (
  //         <Cell
  //           key={index}
  //           style={{
  //             gridRowStart: i + 2,
  //             gridColumnStart: index + 2,
  //             backgroundColor: index % 2 === 0 ? '#eee' : '#c4c4c4',
  //           }}
  //         >
  //           <div style={{ width: '100%' }}>
  //             <Span>
  //               <strong>
  //                 {
  //                   getOddsData(
  //                     matchups,
  //                     matchup,
  //                     selectionList[statSelections[i]].name,
  //                     oddsSnapshotSite,
  //                   ).points
  //                 }
  //               </strong>
  //             </Span>
  //             <br />
  //             <Span>
  //               U:{' '}
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                 ).oddsUnder
  //               }
  //               {'  '}|
  //             </Span>

  //             <Span>
  //               {' '}
  //               O:{' '}
  //               {
  //                 getOddsData(
  //                   matchups,
  //                   matchup,
  //                   selectionList[statSelections[i]].name,
  //                   oddsSnapshotSite,
  //                 ).oddsOver
  //               }
  //             </Span>
  //           </div>
  //         </Cell>
  //       );
  //     }),
  //   );
  // }
}
