import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ResultModel} from '../result.model';
import {ResultsService} from '../../results.service';

@Component({
  selector: 'app-result',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {
  private _result: ResultModel;
  total: number = 0;

  constructor(private route: ActivatedRoute, private resultsService: ResultsService) { }

  ngOnInit(): void {
    console.log('ngOnInit in ResultDetail');
    this.route.params.subscribe(
      (params: Params) => {
        this.result = this.resultsService.getResultByEmpId(+params['id']);
      }
    );
  }

  set result(resultModel: ResultModel) {
    this._result = resultModel;
    this.total = 0;
    for (let pair of resultModel.pairs) {
      switch (pair.estimation) {
        case 'LIKE':
          this.total++;
          break;
        case 'DISLIKE':
          this.total--;
      }
    }
  }

  get result() {
    return this._result;
  }


}
