import styled from 'styled-components';

export const Cell = styled.div`
  display: flex;
  background: #ddd;
  height: 52px;
  width: ${(props) => (props.wide ? 'auto' : 'var(--cell-width)')};
  text-align: center;
`;

export const GridCell = styled.div`
  background: #ddd;
  display: grid;
  width: var(--cell-width);
  grid-template-rows: 2fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid rgb(190, 190, 190);
  background-color: ${(props) => (props.column % 2 === 0 ? '#eee' : '#c4c4c4')};

  .odds {
    display: block;
    padding: 2px;
    width: calc(100% - 4px);
    margin: auto;
    text-align: center;
    align-items: center;
  }

  .stats {
    display: flex;
    padding: 4px 2px 0;
    width: calc(100% - 4px);
    margin: auto;
    text-align: center;
    align-items: center;
  }

  .span-2 {
    grid-column: 1 / span 2;
    padding: 0;
  }

  p {
    margin: auto;
  }
`;

export const StatCell = styled(GridCell)`
  p {
    margin: auto;
  }

  .gauge-container {
    grid-column: 1 / 3;
    text-align: center;
    width: 100%;
  }
`;
