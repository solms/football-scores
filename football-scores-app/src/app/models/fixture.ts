export class Fixture {
  awayTeamName: string;
  date: string;
  homeTeamName: string;
  matchday: number;
  result: {
    goalsAwayTeam: number;
    goalsHomeTeam: number;
    halfTime: {
      goalsAwayTeam: number;
      goalsHomeTeam: number;
    }
  };
  status: 'SCHEDULED' | 'TIMED' | 'POSTPONED' | 'IN_PLAY' | 'CANCELED' | 'FINISHED';
  _links: {
    awayTeam: { href: string; };
    competition: { href: string; };
    homeTeam: { href: string; };
    self: { href: string; };
  };
}