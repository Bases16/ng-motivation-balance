import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {ResultsService} from '../results.service';
import {ResultModel} from '../models-container.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  private _userResults: ResultModel[];
  resolverFailed: boolean;

  constructor(private route: ActivatedRoute, private resultsService: ResultsService){ }

  ngOnInit(): void {
    this.route.data
      .subscribe( (data: Data) => {
        if (data.results === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.userResults = data.results;
        this.resultsService.userResults = this.userResults;
      });
  }

  set userResults(results: ResultModel[]) {
    this._userResults = results;
    this._userResults.sort((r1, r2) => {
      const dateA = new Date(r1.passDatetime).getTime();
      const dateB = new Date(r2.passDatetime).getTime();
      return dateA < dateB ? 1 : -1;
    });
  }

  get userResults(): ResultModel[] {
    return this._userResults;
  }

}
