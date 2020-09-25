import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeadlineDiv = styled.div`
	width: 100%;
	height: 3rem;
	font-size: 2rem;
	color: #ddd;
	text-shadow: 2px 2px 2px #222;
	background: rgb(0, 0, 0);
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(33, 33, 33, 1) 61%,
		rgba(0, 0, 0, 1) 100%
	);
	border-bottom: 2px solid #ddd;
`;

export default function Headline(props) {
	return (
		<HeadlineDiv>
			<div
				style={{
					height: '100%',
					marginLeft: '12%',
					display: 'flex',
				}}
			>
				<span style={{ margin: 'auto 0' }}>{props.headline}</span>
			</div>
		</HeadlineDiv>
	);
}
