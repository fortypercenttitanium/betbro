import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Background } from './LoadingScreen';

const NavContainer = styled.nav`
  width: 100%;
  height: 6rem;
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
  display: flex;
  overflow: hidden;
  @media (max-width: 600px) {
    background: black;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex: 3 1 auto;
  justify-content: flex-end;
  height: 100%;
  margin: auto 3%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const LinkDiv = styled.div`
  text-align: center;
  display: flex;
  height: 100%;
  color: #fff;
  margin: auto;
  padding: 0 1rem;
  cursor: pointer;
  &:hover > span {
    text-decoration: underline;
  }
  & > span {
    margin: auto;
  }
`;

const LinkDivMobile = styled(LinkDiv)`
  flex: 1;
  padding: 2rem 1rem;
  font-size: 1.4rem;
`;

const HamburgerDiv = styled(LinkDiv)`
  display: none;
  margin-right: 5%;
  height: 32px;
  z-index: 5;
  &:hover > span {
    text-decoration: none;
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  height: 100%;
  margin: auto auto auto 5%;
`;

const Span = styled.span`
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  transform: ${(props) => (props.underline ? 'scale(1.1)' : 'none')};
`;

const MenuBackground = styled(Background)`
  overflow: hidden;
  top: 6rem;
  z-index: 5;
`;

const NavDrawer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  z-index: 0;
  flex-direction: column;
  top: 6rem;
  right: 0;
  left: 0;
  border-bottom: 2px solid white;
  overflow: hidden;
  animation: slidein 0.5s;
  @keyframes slidein {
    from {
      /* transform: translateY(-100%); */
      max-height: 0;
    }
    to {
      /* transform: translateY(0); */
      max-height: 100%;
    }
  }
`;

export default function Navbar(props) {
  const { headline } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <NavContainer>
      <LogoContainer>
        <Link to="/home">
          <img
            src={require('../images/logo-no-sub.png')}
            alt="BetBro logo"
            style={{ width: '150px', position: 'relative', top: '-25px' }}
          />
        </Link>
      </LogoContainer>
      <LinksContainer>
        <Link to="/">
          <LinkDiv>
            <Span underline={headline === 'breakdowns'}>Bro's Breakdowns</Span>
          </LinkDiv>
        </Link>
        <Link className="first-link" to="/about">
          <LinkDiv className="first-link">
            <Span underline={headline === 'about'}>Why BetBro?</Span>
          </LinkDiv>
        </Link>
        <Link to="/contact">
          <LinkDiv>
            <Span underline={headline === 'contact'}>Contact</Span>
          </LinkDiv>
        </Link>
        {/* <Link to='/mybetbro'>
					<LinkDiv>
					<Span underline={headline === 'mybetbro'}>My BetBro</Span>
					</LinkDiv>
				</Link> */}
      </LinksContainer>
      <HamburgerDiv
        onClick={() => {
          menuOpen ? closeMenu() : openMenu();
        }}
      >
        <img
          src={require('../images/hamburger.svg')}
          alt="Click to open nav menu"
        />
      </HamburgerDiv>
      {menuOpen && (
        <MenuBackground onClick={closeMenu}>
          <NavDrawer>
            <Link className="first-link" to="/about">
              <LinkDivMobile className="first-link">
                <Span underline={headline === 'about'}>Why BetBro?</Span>
              </LinkDivMobile>
            </Link>
            <Link to="/">
              <LinkDivMobile>
                <Span underline={headline === 'breakdowns'}>
                  Bro's Breakdowns
                </Span>
              </LinkDivMobile>
            </Link>
            <Link to="/contact">
              <LinkDivMobile>
                <Span underline={headline === 'contact'}>Contact</Span>
              </LinkDivMobile>
            </Link>
          </NavDrawer>
        </MenuBackground>
      )}
    </NavContainer>
  );
}
