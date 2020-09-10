import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeadlineDiv = styled.div`
	background: #2c2837;
	width: 100%;
	height: 3rem;
	font-size: 2rem;
	color: #ddd;
	text-shadow: 2px 2px 2px #222;
`;

export default function Headline(props) {
	const location = useLocation();
	const getHeadline = () => {
		switch (location.pathname) {
			case '/home':
				return '';
			case '/about':
				return 'Why Bet Bro?';
			case '/breakdowns':
				return "Bro's Breakdowns";
			case '/contact':
				return 'Contact Us';
			case 'mybetbro':
				return 'Customize Your Breakdowns';
			default:
				return '';
		}
	};
	return (
		<HeadlineDiv>
			<span style={{ marginLeft: '12%' }}>{getHeadline()}</span>
		</HeadlineDiv>
	);
}
