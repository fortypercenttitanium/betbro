import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > * {
    margin: 16px;
  }
`;

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);

  return (
    <NotFoundContainer>
      <h1>Page not found</h1>
      <p>Oops, sorry we could find that page. Redirecting you home ...</p>
    </NotFoundContainer>
  );
}
