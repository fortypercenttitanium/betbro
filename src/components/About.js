import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const ScrollContainer = styled.div`
	/* overflow: auto; */
	width: 100%;
`;

const AboutContainer = styled.div`
	position: relative;
	width: 80%;
	max-width: 500px;
	text-align: center;
	display: flex;
	flex-direction: column;
	margin: 2rem auto;
`;

const HeaderContainer = styled.div`
	border: 2px solid #ddd;

	background: rgb(0, 0, 0);
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(51, 51, 51, 1) 29%,
		rgba(42, 42, 42, 1) 53%,
		rgba(47, 47, 47, 1) 63%,
		rgba(0, 0, 0, 1) 100%
	);
	z-index: ${(props) => props.zIndex};

	@media (max-width: 1171px) {
		position: sticky;
		top: 0;
	}
`;

const H1 = styled.h1`
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
	padding: 1rem;
	font-size: 2rem;
`;

const StyledP = styled.p`
	font-size: 1.2rem;
	position: relative;
	z-index: 0;
	text-align: justify;
	padding: 3rem;
	background-color: rgba(0, 0, 0, 0.5);
	margin: 1rem auto;
	line-height: calc(1.8rem + 1vw);
`;

const Button = styled.div`
	display: flex;
	margin: auto;
	padding: 1rem;
	border-radius: 20px;
	background-color: var(--betbro-blue);
	color: #ddd;
	box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
	transition: 0.3s;
	&:hover {
		transition: 0.3s;
		background-color: #ddd;
		& > span {
			color: var(--betbro-blue);
		}
	}
	&:active {
		transition: 0.1s;
		transform: scale(0.9);
	}
`;

const Span = styled.span`
	color: #ddd;
	font-size: 1rem;
	margin: auto;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
`;

export default function About(props) {
	useEffect(() => {
		props.setHeadline('about');
	}, [props]);
	return (
		<ScrollContainer>
			<Helmet>
				<meta charSet='utf-8' />
				<meta
					name='description'
					content='Betbro is here for you, designed to give you consistent,
					reliable information for NFL sports betting, all in one place.'
				/>
				<title>{'Why BetBro?'}</title>
			</Helmet>

			<AboutContainer>
				<HeaderContainer zIndex={2}>
					<H1>Consult</H1>
				</HeaderContainer>

				<StyledP>
					Yeah, we know you know what you’re doing. But everyone has a tough
					week sometimes. Life, kids, work, or maybe you’re in a slump. The last
					thing you need is to be scrambling on NFL Sundays when there’s money
					to be made! No more jumping from site to site, or waiting for your
					buddy to text you back. Betbro is here for you, designed to give you
					consistent, reliable information for NFL sports betting, all in one
					place. It’s like asking your buddy at the bar, except our stats are
					never wrong.
				</StyledP>
				<HeaderContainer zIndex={3}>
					<H1>Customize</H1>
				</HeaderContainer>

				<StyledP>
					Do you always bet on the over/under? Are you looking for a certain
					stat to give you an edge? Are you keeping track of a multi-bet parlay?
					Betbro allows you to customize your page to give you the stats you
					need in real time while you’re betting. There’s no second guessing
					when you have all the information you need in front of you to maximize
					your decision, and your money.
				</StyledP>
				<HeaderContainer zIndex={4}>
					<H1>Cash Out</H1>
				</HeaderContainer>

				<StyledP>
					Betbro’s vast odds and NFL stat pools will help you make more informed
					sports bets to earn more. We do the work for you. All you have to do
					is put your money where our mouth is, and see the results.
				</StyledP>
				<HeaderContainer zIndex={5}>
					<H1>Continue</H1>
				</HeaderContainer>

				<StyledP>
					Bet bro is a tool designed for you. Save your pages and see past
					history, NFL game results and stats to make informed decisions on your
					next bets so you can continue to earn. Only Betbro offers fast,
					reliable information, that’s always for you. Maybe buy us a beer
					sometime?
				</StyledP>
				<StyledP
					style={{
						backgroundColor: 'transparent',
						textAlign: 'center',
						margin: '1rem auto',
						paddingBottom: '0',
					}}
				>
					But don't take our word for it...
				</StyledP>
				<Link style={{ margin: '1rem auto' }} to='/breakdowns'>
					<Button>
						<Span>Check it out for yourself!</Span>
					</Button>
				</Link>
			</AboutContainer>
		</ScrollContainer>
	);
}
