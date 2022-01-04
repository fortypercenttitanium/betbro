import React from 'react';
import styled from 'styled-components';
import GridStats from './GridStats';
import abbTeam from '../../../../tools/teamAbbreviations';
import statNameAPI from '../../../../tools/namingLibrary/statNames';
import StatSelections from './StatSelections';
import { Cell } from '../sharedStyles';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: auto;

  .grid-container {
    display: flex;
    margin: auto;
    height: 100%;
    background-color: rgba(250, 250, 250, 0.8);
    border-radius: 6px;
  }

  .selector-column {
    display: flex;
    position: sticky;
    left: 0;
    padding-bottom: 1rem;
    gap: 5px;
    border-right: 4px solid rgba(20, 20, 20, 0.5);
    flex-direction: column;
    grid-row-start: 2;
    & > * {
      flex-basis: 52px;
    }

    .blank-cell {
      display: 'flex';
      background: 'transparent';
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-auto-rows: 52px;
  height: -moz-min-content;
  height: min-intrinsic;
  height: min-content;
  padding: 0 1rem 1rem 0;
  gap: 5px;
  background-color: transparent;
  color: var(--betbro-blue);
`;

export const Selector = styled.select`
  font-size: 1rem;
  background: #2c2837;
  height: 100%;
  color: #eee;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

const Span = styled.span`
  font-size: 1.3rem;
  margin: auto;
`;
const SmallSpan = styled(Span)`
  font-size: 0.8rem;
`;

const Text = styled.span`
  margin: auto;
  font-size: 0.9rem;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
`;

export default function GridLayout(props) {
  const {
    statSelections,
    handleChangeStatSelections,
    matchups,
    oddsSnapshotSite,
    setOddsSnapshotSite,
    oddsLastUpdated,
    stats,
  } = props;

  return (
    <MainContainer>
      <div className="grid-container">
        <div className="selector-column">
          <div className="blank-cell" />
          <StatSelections
            selections={statSelections}
            onChange={handleChangeStatSelections}
          />
        </div>

        {/* <Grid rows={statSelections.length}>
          {matchups.map((matchup, i) => {
            return (
              <Cell
                key={i}
                style={{
                  gridRowStart: 1,
                  gridColumnStart: i + 2,
                  background: '#2c2837',
                  textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
                  color: '#eee',
                  flexDirection: 'column',
                }}
              >
                <Span>
                  {`${abbTeam(matchup.awayTeam.team)} @ ${abbTeam(
                    matchup.homeTeam.team,
                  )}`}
                </Span>
                <SmallSpan>
                  {matchup.time.format('ddd MMM. Do, h:mma')}
                </SmallSpan>
              </Cell>
            );
          })}
          <GridStats />
        </Grid> */}
      </div>
    </MainContainer>
  );
}
