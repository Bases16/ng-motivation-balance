import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../../results.service';

@Component({
  selector: 'app-results-start',
  templateUrl: './results-start.component.html'
})
export class ResultsStartComponent implements OnInit {
  hasResults: boolean;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.hasResults = !!this.resultsService.userResults
                      && this.resultsService.userResults.length > 0;
  }

}
