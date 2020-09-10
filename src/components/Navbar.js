import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
	width: 100%;
	height: 6rem;
	background-color: #c4c4c4;
	display: flex;
`;

const LinksContainer = styled.div`
	display: flex;
	flex: 1 0 auto;
	justify-content: flex-end;
	height: 100%;
	margin-left: auto;
`;

const LinkDiv = styled.div`
	display: flex;
	flex-basis: 130px;
	height: 100%;
	color: #5c49d0;
	margin: auto;
	padding: 0 2rem;
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
`;

export default function Navbar() {
	return (
		<NavContainer>
			<LogoContainer>
				<img
					src='images/logo.png'
					alt='BetBro logo'
					style={{ height: '100%' }}
				/>
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
