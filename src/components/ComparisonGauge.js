import React from 'react';

export default function ComparisonGauge(props) {
	const circlePosition =
		props.awayRank && props.homeRank
			? Math.round((props.awayRank - props.homeRank + 41) * 1.52) - 2
			: 60;
	const teamColors = {
		'Arizona Cardinals': '#97233F',
		'Atlanta Falcons': '#A71930',
		'Baltimore Ravens': '#241773',
		'Buffalo Bills': '#00338D',
		'Carolina Panthers': '#0085CA',
		'Chicago Bears': '#0B162A',
		'Cincinnati Bengals': '#FB4F14',
		'Cleveland Browns': '#311D00',
		'Dallas Cowboys': '#003594',
		'Denver Broncos': '#FB4F14',
		'Detroit Lions': '#0076B6',
		'Green Bay Packers': '#203731',
		'Houston Texans': '#03202F',
		'Indianapolis Colts': '#002C5F',
		'Jacksonville Jaguars': '#101820',
		'Kansas City Chiefs': '#E31837',
		'Los Angeles Chargers': '#002A5E',
		'Los Angeles Rams': '#003594',
		'Las Vegas Raiders': '#000000',
		'Miami Dolphins': '#008E97',
		'Minnesota Vikings': '#4F2683',
		'New England Patriots': '#002244',
		'New Orleans Saints': '#D3BC8D',
		'New York Giants': '#0B2265',
		'New York Jets': '#125740',
		'Philadelphia Eagles': '#004C54',
		'Pittsburgh Steelers': '#FFB612',
		'Seattle Seahawks': '#69BE28',
		'San Francisco 49ers': '#AA0000',
		'Tampa Bay Buccaneers': '#D50A0A',
		'Tennessee Titans': '#0C2340',
		'Washington Football Team': '#773141',
		None: '#c4c4c4',
	};
	const circleColor =
		teamColors[
			props.awayRank < props.homeRank
				? props.awayTeam
				: props.awayRank > props.homeRank
				? props.homeTeam
				: 'None'
		];
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 -4 120 20'
			width='100'
			height='20'
			style={{ margin: 'auto' }}
		>
			<line x1='10' x2='110' y1='10' y2='10' stroke='black' />
			<line x1='60' x2='60' y1='0' y2='10' stroke='black' />
			<circle cy='10' r='5' cx={circlePosition} fill={circleColor} />
		</svg>
	);
}
