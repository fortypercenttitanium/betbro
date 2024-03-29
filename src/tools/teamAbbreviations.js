const abbreviations = {
  'Arizona Cardinals': 'ARI',
  'Atlanta Falcons': 'ATL',
  'Baltimore Ravens': 'BAL',
  'Buffalo Bills': 'BUF',
  'Carolina Panthers': 'CAR',
  'Chicago Bears': 'CHI',
  'Cincinnati Bengals': 'CIN',
  'Cleveland Browns': 'CLE',
  'Dallas Cowboys': 'DAL',
  'Denver Broncos': 'DEN',
  'Detroit Lions': 'DET',
  'Green Bay Packers': 'GB',
  'Houston Texans': 'HOU',
  'Indianapolis Colts': 'IND',
  'Jacksonville Jaguars': 'JAX',
  'Kansas City Chiefs': 'KC',
  'Los Angeles Chargers': 'LAC',
  'Los Angeles Rams': 'LAR',
  'Las Vegas Raiders': 'LV',
  'Miami Dolphins': 'MIA',
  'Minnesota Vikings': 'MIN',
  'New England Patriots': 'NE',
  'New Orleans Saints': 'NO',
  'New York Giants': 'NYG',
  'New York Jets': 'NYJ',
  'Philadelphia Eagles': 'PHI',
  'Pittsburgh Steelers': 'PIT',
  'Seattle Seahawks': 'SEA',
  'San Francisco 49ers': 'SF',
  'Tampa Bay Buccaneers': 'TB',
  'Tennessee Titans': 'TEN',
  'Washington Football Team': 'WAS',
};

export const teamsArray = Object.keys(abbreviations);

export default function convertName(teamName) {
  if (abbreviations.hasOwnProperty(teamName)) {
    return abbreviations[teamName];
  } else {
    const firstThree = teamName.slice(0, 3).toUpperCase();
    return firstThree;
  }
}
