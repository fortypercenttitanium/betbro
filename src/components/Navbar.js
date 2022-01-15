import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../images/logo-no-sub.png';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px 0 24px;
  width: 100%;
  height: 96px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 29%,
    rgba(42, 42, 42, 1) 53%,
    rgba(47, 47, 47, 1) 63%,
    rgba(0, 0, 0, 1) 100%
  );
  border-bottom: 4px solid #ddd;
  overflow: hidden;

  @media (max-width: 600px) {
    background: black;
  }

  .link-container {
  }

  .link {
    font-weight: bold;
    font-size: 1.2rem;
    transition: 0.3s;
    :hover {
      text-decoration: underline;
      color: white;
    }
  }

  .nav-logo {
    height: 140px;
    transition: 0.5s;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export default function Navbar() {
  return (
    <NavContainer>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="BetBro logo" className="nav-logo" />
        </Link>
      </div>
      <div className="link-container">
        <Link to="/contact">
          <p className="link">Contact</p>
        </Link>
      </div>
    </NavContainer>
  );
}
