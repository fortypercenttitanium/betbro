export default function newTeamName(team) {
	const newTeam =
		team === 'Washington Redskins'
			? 'Washington Football Team'
			: team === 'Oakland Raiders'
			? 'Las Vegas Raiders'
			: team;
	return newTeam;
}
