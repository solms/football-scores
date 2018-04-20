import { Component, OnInit } from '@angular/core';
import { FootballDataService } from './football-data.service';
import { LeagueTable } from './models/leagueTable';
import { GameWeek } from './models/gameWeek';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FootballDataService]
})
export class AppComponent implements OnInit {
  title = 'app';
  table: LeagueTable;
  gameweek: GameWeek;

  constructor(private footballData: FootballDataService) {}

  ngOnInit() {
    this.getTable();
  }

  getTable() {
    this.footballData.getTable()
      .subscribe(
        data => {
          this.table = data;
          this.getFixtures(data.matchday);
        },
        error => console.log(error)
      );
  }

  getFixtures(matchDay: number) {
    this.footballData.getFixtures(matchDay)
      .subscribe(
        data => this.gameweek = data,
        error => console.log(error)
      );
  }

}
