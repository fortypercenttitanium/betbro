import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import Modal from './Modal';
import Selectors from '../grid/Selectors';
import TileCellType from './TileCellType';
import MatchupHeader from './MatchupHeader';
import { ReactComponent as CloseButton } from '../../../../images/close.svg';

const ModalBackground = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .details-container {
    position: relative;
    background-color: var(--betbro-blue);
    margin: 24px auto auto;
    height: 95%;
    min-width: 360px;
    flex-direction: column;
    display: flex;
    padding: 30px 12px 12px;
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #ddd;
  }

  .close-button-container {
    position: absolute;
    right: 30px;
    cursor: pointer;
    :hover {
      .close-button {
        color: #eee;
      }
    }
  }

  .close-button {
    color: #bbb;
    height: 30px;
    transition: 0.3s;
  }

  .details-body {
    display: flex;
    margin: auto;
  }

  .selectors-container {
    display: flex;
    position: sticky;
    left: 0;
    padding: 0 4px 4px;
    gap: 5px;
    flex-direction: column;
    grid-row-start: 2;
    & > * {
      flex-basis: 52px;
    }
  }

  .cells-container {
    display: grid;
    grid-auto-rows: 52px;
    height: min-content;
    padding: 0 16px 0 0;
    gap: 5px;
    background-color: transparent;
    color: var(--betbro-blue);
  }

  .matchup-time {
    text-shadow: 2px 2px 2px #222;
    padding-bottom: 12px;
  }

  @media (max-width: 768px) {
    .matchup-time {
      font-size: 1rem;
    }
  }
`;

function TileDetails({
  handleClose,
  stats,
  statSelections,
  handleChangeStatSelections,
  selectionList,
  sportsbook,
  tileDetails: matchup,
}) {
  const { home_team, away_team } = matchup;
  const homeTeamStats = stats[home_team];
  const awayTeamStats = stats[away_team];
  const homeRecord = stats[matchup.home_team].record.record.value;
  const awayRecord = stats[matchup.away_team].record.record.value;

  return (
    <Modal>
      <ModalBackground onClick={handleClose}>
        <div className="details-container" onClick={(e) => e.stopPropagation()}>
          <div className="close-button-container" onClick={handleClose}>
            <CloseButton className="close-button" />
          </div>
          <MatchupHeader
            matchup={matchup}
            homeRecord={homeRecord}
            awayRecord={awayRecord}
          />

          <h2 className="matchup-time">
            {format(new Date(matchup.commence_time), 'EEE MMM Do, h:mma')}
          </h2>
          <div className="details-body">
            <div className="selectors-container">
              <Selectors
                selectionList={selectionList}
                selections={statSelections}
                onChange={handleChangeStatSelections}
              />
            </div>
            <div className="cells-container">
              {statSelections.map((selection, row) => {
                return (
                  <TileCellType
                    key={`${row} - ${selection.category}: ${selection.name}`}
                    row={row + 1}
                    matchup={matchup}
                    selection={selection}
                    homeTeamStats={homeTeamStats}
                    awayTeamStats={awayTeamStats}
                    sportsbook={sportsbook}
                    column={1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </ModalBackground>
    </Modal>
  );
}

export default TileDetails;
