import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto 24px;
`;

function NotEnoughRoom() {
  return (
    <Container>
      <h1>Your screen isn't big enough to view the grid. Try tile mode!</h1>
    </Container>
  );
}

export default NotEnoughRoom;
