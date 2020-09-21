import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
	display: flex;
	background: #2c2837;
	position: relative;
	margin: 0;
	height: calc(100vh - 10rem);
	width: 100%;
`;

const LeftContainer = styled.div`
	display: flex;
	color: #ddd;
	height: 100%;
	flex: 0.8;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1.2;
	color: #ddd;
	height: 100%;
`;

const CircleDiv = styled.div`
	display: block;
	border: 1px solid transparent;
	border-radius: 50%;
	height: 25rem;
	width: 25rem;
	background: white;
	margin: auto;
`;

const H1 = styled.h1`
	font-size: 3rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
`;
const H2 = styled.h2`
	font-size: 2rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
`;

const TopTextDiv = styled.div`
	display: flex;
	flex: 0.8;
	margin-left: 3rem;
`;
const BottomTextDiv = styled.div`
	display: flex;
	flex: 1.2;
	margin-left: 6rem;
`;

export default function Home() {
	return (
		<HomeContainer>
			<LeftContainer>
				<CircleDiv></CircleDiv>
			</LeftContainer>
			<RightContainer>
				<TopTextDiv>
					<H1>Tag Line</H1>
				</TopTextDiv>
				<BottomTextDiv>
					<H2>Testimonial/subtitle</H2>
				</BottomTextDiv>
			</RightContainer>
		</HomeContainer>
	);
}
