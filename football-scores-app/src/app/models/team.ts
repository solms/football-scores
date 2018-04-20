export class Team {
  teamName: string;
  crestURI: string;
  position: number;
  points: number;
  playedGames: number;
  home: { goals: number; goalsAgainst: number; wins: number; draws: number; losses: number; };
  away: { goals: number; goalsAgainst: number; wins: number; draws: number; losses: number; };
  draws: number;
  goalDifference: number;
  goals: number;
  goalsAgainst: number;
  losses: number;
  wins: number;
}
