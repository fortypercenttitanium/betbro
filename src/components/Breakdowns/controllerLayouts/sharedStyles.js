import styled from 'styled-components';

export const Cell = styled.div`
  display: flex;
  background: #ddd;
  height: 52px;
  width: var(--cell-width);
  text-align: center;
`;

export const WideCell = styled(Cell)`
  width: auto;
`;
