import React from 'react';
import styled from 'styled-components';

export default function ComparisonGauge(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 150 20'
			width='100%'
			height='10'
		>
			<line x1='0' x2='149' y1='9' y2='9' stroke='black' />
			<line x1='74' x2='74' y1='0' y2='9' stroke='black' />
			<circle cy='9' r='5' cx='74' />
		</svg>
	);
}
