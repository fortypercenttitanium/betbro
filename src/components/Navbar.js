import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../images/logo-no-sub.png';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  .right {
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
    margin-right: 36px;
    @media (max-width: 600px) {
      margin-right: 8px;
      gap: 12px;
    }
  }

  .link {
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    transition: 0.3s;
    :hover {
      text-decoration: underline;
      color: white;
    }

    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
  }

  .logo-container {
    min-width: 140px;
    margin: 0 24px;
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
      <div className="right">
        <div className="link-container">
          <a
            href="https://www.buymeacoffee.com/benderthedev"
            target="_blank"
            rel="noreferrer"
          >
            <p className="link">Buy me a beer</p>
          </a>
        </div>
        <div className="link-container">
          <Link to="/contact">
            <p className="link">Contact</p>
          </Link>
        </div>
      </div>
    </NavContainer>
  );
}
