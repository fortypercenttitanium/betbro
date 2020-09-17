import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
	width: 100%;
	height: 6rem;
	background-color: #c4c4c4;
	display: flex;
	overflow: auto;
`;

const LinksContainer = styled.div`
	display: flex;
	flex: 3 1 auto;
	justify-content: flex-end;
	height: 100%;
	margin: auto 3%;
`;

const LinkDiv = styled.div`
	text-align: center;
	display: flex;
	height: 100%;
	color: #222;
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

const LogoContainer = styled.div`
	display: flex;
	height: 100%;
	margin: auto;
`;

export default function Navbar() {
	return (
		<NavContainer>
			<LogoContainer>
				<Link to='/'>
					<img
						src='images/logo.png'
						alt='BetBro logo'
						style={{ width: '230px', position: 'relative', top: '-70px' }}
					/>
				</Link>
			</LogoContainer>
			<LinksContainer>
				<Link className='first-link' to='/about'>
					<LinkDiv className='first-link'>
						<span>Why BetBro?</span>
					</LinkDiv>
				</Link>
				<Link to='/breakdowns'>
					<LinkDiv>
						<span>Bro's Breakdowns</span>
					</LinkDiv>
				</Link>
				<Link to='/mybetbro'>
					<LinkDiv>
						<span>My BetBro</span>
					</LinkDiv>
				</Link>
				<Link to='/contact'>
					<LinkDiv>
						<span>Contact</span>
					</LinkDiv>
				</Link>
			</LinksContainer>
		</NavContainer>
	);
}
