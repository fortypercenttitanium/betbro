import React from 'react';
import styled from 'styled-components';

export const Background = styled.div`
	position: fixed;
	display: flex;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	overflow: none;
	z-index: 2;
	background: rgba(0, 0, 0, 0.7);
`;

const LoadingDiv = styled.div`
	display: flex;
	width: 20rem;
	z-index: 3;
	border: 3px solid #000;
	background: lightblue;
	text-align: center;
	padding: 1rem;
	margin: 15rem auto auto;
`;

const Text = styled.h1`
	margin: auto;
	color: #111;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	padding: 2rem;
`;

export default function LoadingScreen(props) {
	return (
		<Background>
			<LoadingDiv>
				<Text>Loading...</Text>
			</LoadingDiv>
		</Background>
	);
}
