import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LeagueTable } from './models/leagueTable';
import { GameWeek } from './models/gameWeek';

@Injectable()
export class FootballDataService {

  HEADERS = new HttpHeaders({ 'X-Auth-Token': 'dc25ff8a0521411385adbe5bb16aefc7' });
  COMPETITION_URL = 'http://api.football-data.org/v1/competitions/';
  PL_ID = 445;

  constructor(private http: HttpClient) { }

  getTable(): Observable<LeagueTable> {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/leagueTable',
      { headers: this.HEADERS }).map(res => res as LeagueTable);
  }

  getFixtures(matchDay: number): Observable<GameWeek> {
    return this.http.get(this.COMPETITION_URL + this.PL_ID + '/fixtures?matchday=' + matchDay, { headers: this.HEADERS })
      .map(res => res as GameWeek);
  }

}
