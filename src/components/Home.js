import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bbHomepage from '../images/bb-homepage.png';

const HomeContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	min-width: 1297px;
	overflow-y: auto;
	overflow-x: hidden;
	text-align: center;

	@media (max-width: 1170px) {
		min-width: initial;
		flex-direction: column;
		background: none;
	}
`;

const SplashImg = styled.img`
	display: block;
	height: 100%;
	min-height: 580px;
	width: auto;
	margin: auto;
	@media (max-width: 1170px) {
		display: none;
	}
`;

// const LeftContainer = styled.div`
// 	display: none;
// 	position: relative;
// 	color: #ddd;
// 	width: 45%;
// 	@media (max-width: 1170px) {
// 		display: none;
// 	}
// `;

const RightContainer = styled.div`
	display: none;
	flex-direction: column;
	width: 55%;
	color: #ddd;
	@media (max-width: 1170px) {
		display: flex;
		width: 80%;
		margin: 2rem auto;
	}
`;

// const CircleDiv = styled.div`
// 	display: flex;
// 	background: transparent;
// 	margin: auto;
// 	height: auto;
// 	margin-right: 0;
// 	margin-top: 5%;
// 	width: 95%;
// `;

const TopTextDiv = styled.div`
	display: flex;
	width: 95%;
	margin: 3rem auto 0 0;
	text-align: center;
	@media (max-width: 1170px) {
		flex-direction: column;
		margin: 2rem auto 1rem;
	}
`;
const BottomTextDiv = styled.div`
	display: flex;
	width: 85%;
	flex-direction: column;
	margin: 0 auto;
`;

const H1 = styled.h1`
	font-size: calc(1rem + 3vw);
	font-weight: 500;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	line-height: 4.2rem;
	margin: auto;
	@media (max-width: 1170px) {
		line-height: 3rem;
	}
`;
const H2 = styled.h2`
	font-family: 'Overpass', sans-serif;
	font-size: 2rem;
	font-weight: 400;
	line-height: 3rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	@media (max-width: 1170px) {
		font-size: 1rem;
		line-height: 1.6rem;
		width: 80%;
		margin: auto;
	}
`;

const LinkDiv = styled.div`
	position: absolute;
	display: flex;
	left: 60%;
	top: calc(17.3rem + 3vw);
	height: 10rem;
	overflow: hidden;
	@media (max-width: 1171px) {
		display: none;
	}
`;

const H3 = styled(H1)`
	font-size: 2rem;
	font-style: italic;
	line-height: 3rem;
	font-weight: 300;
	margin: 1rem 2rem 0 auto;
	text-decoration: underline;
	&:visited {
		color: #ddd;
	}
	@media (max-width: 1170px) {
		font-size: calc(0.5rem + 3vw);
		margin: 3rem auto;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
		&.desktop {
			display: none;
		}
	}
	@media (min-width: 1171px) {
		position: relative;
		font-size: calc(1rem + 0.5vw);
	}
`;

const BBH1 = styled(H1)`
	margin: 3% auto;
	@media (max-width: 1170px) {
		display: none;
	}
`;

const MobileLogo = styled.img`
	display: none;
	height: 6rem;
	margin: 2rem auto;
	@media (max-width: 1170px) {
		display: block;
	}
`;

// const LogoImg = styled.img`
// 	display: block;
// 	max-height: 32rem;
// 	max-width: 32rem;
// 	height: auto;
// 	width: 100%;
// 	margin-left: auto;
// 	border: 7px solid #ddd;
// 	border-radius: 50%;
// `;

export default function Home(props) {
	useEffect(() => {
		props.setHeadline('');
	}, [props]);
	return (
		<HomeContainer>
			<SplashImg src={bbHomepage} />
			<LinkDiv>
				<H3 className='desktop'>
					<Link to='/about'>Here's the reason why... </Link>
				</H3>
			</LinkDiv>

			{/* <LeftContainer>
				<CircleDiv>
					<LogoImg src='../images/logo.png' alt='BETBRO logo' />
				</CircleDiv>
			</LeftContainer> */}
			<RightContainer>
				<TopTextDiv>
					<H1>
						The most successful sports betters use <br />
					</H1>
					<MobileLogo src='../images/logo-no-sub-trans.png' alt='BETBRO logo' />
				</TopTextDiv>
				<BBH1>
					<strong>
						<i>BETBRO</i>
					</strong>
				</BBH1>
				<BottomTextDiv>
					<H2>
						“<i>BETBRO</i> is the stat tool I didn’t know I needed to give me
						the edge with my weekly football picks.”
						<br />
						<i style={{ marginLeft: '2rem' }}>-Anthony, NJ</i>
					</H2>

					<H3>
						<Link to='/about'>Here's the reason why... </Link>
					</H3>
				</BottomTextDiv>
			</RightContainer>
		</HomeContainer>
	);
}
