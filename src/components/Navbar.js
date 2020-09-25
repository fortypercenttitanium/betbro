import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const LogoContainer = styled.div`
	display: flex;
	height: 100%;
	margin: auto auto auto 5%;
`;

const Span = styled.span`
	text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
	transform: ${(props) => (props.underline ? 'scale(1.1)' : 'none')};
`;

export default function Navbar(props) {
	const { headline } = props;
	return (
		<NavContainer>
			<LogoContainer>
				<Link to='/'>
					<img
						src='images/logo-no-sub.png'
						alt='BetBro logo'
						style={{ width: '150px', position: 'relative', top: '-25px' }}
					/>
				</Link>
			</LogoContainer>
			<LinksContainer>
				<Link className='first-link' to='/about'>
					<LinkDiv className='first-link'>
						<Span underline={headline === 'about'}>Why BetBro?</Span>
					</LinkDiv>
				</Link>
				<Link to='/breakdowns'>
					<LinkDiv>
						<Span underline={headline === 'breakdowns'}>Bro's Breakdowns</Span>
					</LinkDiv>
				</Link>
				<Link to='/mybetbro'>
					<LinkDiv>
						<Span underline={headline === 'mybetbro'}>My BetBro</Span>
					</LinkDiv>
				</Link>
				<Link to='/contact'>
					<LinkDiv>
						<Span underline={headline === 'contact'}>Contact</Span>
					</LinkDiv>
				</Link>
			</LinksContainer>
		</NavContainer>
	);
}
