import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
	display: flex;
	background: #2c2837;
	position: relative;
	margin: -3rem 0 0;
	min-height: 35rem;
	height: 100%;
	width: 100%;
	overflow: auto;
`;

const LeftContainer = styled.div`
	display: flex;
	position: relative;
	color: #ddd;
	height: 100%;
	width: 45%;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 55%;
	color: #ddd;
	height: 100%;
`;

const CircleDiv = styled.div`
	display: flex;
	position: relative;
	height: 100%;
	width: 100%;
	background: transparent;
`;

const TopTextDiv = styled.div`
	display: flex;
	width: 95%;
	margin: 6rem auto 0 0;
	text-align: center;
`;
const BottomTextDiv = styled.div`
	display: flex;
	width: 80%;
	flex-direction: column;
	margin: 0 auto;
`;

const H1 = styled.h1`
	font-size: 4rem;
	font-weight: 500;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	line-height: 4.2rem;
	margin: auto;
`;
const H2 = styled.h2`
	font-family: 'Overpass', sans-serif;
	font-size: 2rem;
	font-weight: 400;
	line-height: 3rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	padding: 0 5rem;
`;

const H3 = styled(H1)`
	font-size: 2rem;
	font-style: italic;
	line-height: 3rem;
	font-weight: 300;
	margin: 0 2rem 0 auto;
	text-decoration: underline;
	&:visited {
		color: #ddd;
	}
`;

const LogoImg = styled.img`
	position: relative;
	height: 38rem;
	margin: auto 0 auto auto;
	border-radius: 50%;
`;

export default function Home() {
	return (
		<HomeContainer>
			<LeftContainer>
				<CircleDiv>
					<LogoImg src='images/logo.png' />
				</CircleDiv>
			</LeftContainer>
			<RightContainer>
				<TopTextDiv>
					<H1>
						The most successful sports betters use <br />
						<strong>
							<i>BETBRO</i>
						</strong>
					</H1>
				</TopTextDiv>
				<BottomTextDiv>
					<H2>
						“<i>BETBRO</i> is the stat tool I didn’t know I needed to give me
						the edge with my weekly football picks.”
						<br />
						<i>-Anthony, NJ</i>
					</H2>

					<H3>
						<Link to='/about'>Here's the reason why... </Link>
					</H3>
				</BottomTextDiv>
			</RightContainer>
		</HomeContainer>
	);
}
