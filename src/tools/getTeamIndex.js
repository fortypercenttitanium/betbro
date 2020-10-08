const getTeamIndex = (matchups, matchupIndex, team) => {
	const odds = matchups[matchupIndex].betting;
	return odds.teams.indexOf(team);
};

export default getTeamIndex;
