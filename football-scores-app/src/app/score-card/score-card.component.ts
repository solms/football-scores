import { Component, OnInit, Input } from '@angular/core';
import { Fixture } from '../models/fixture';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input() fixture: Fixture;

  constructor() { }

  ngOnInit() {
  }

}
