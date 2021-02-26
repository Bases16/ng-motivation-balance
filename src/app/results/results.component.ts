import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {ResultsService} from '../results.service';
import {ResultModel} from '../models-container.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  private _userResults: ResultModel[];
  resolverFailed: boolean;

  constructor(private route: ActivatedRoute, private resultsService: ResultsService){ }

  ngOnInit() {
    this.route.data
      .subscribe( (data: Data) => {
        if (data['results'] === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.userResults = data['results'];
        this.resultsService.userResults = this.userResults;
      });
  }

  set userResults(results: ResultModel[]) {
    this._userResults = results;
    this._userResults.sort((r1, r2) => {
      let dateA = new Date(r1.passDatetime).getTime();
      let dateB = new Date(r2.passDatetime).getTime();
      return dateA < dateB ? 1 : -1;
    });
  }

  get userResults() {
    return this._userResults;
  }

}
