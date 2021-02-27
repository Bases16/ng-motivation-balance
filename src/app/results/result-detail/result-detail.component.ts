import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResultsService} from '../../results.service';
import {ResultModel} from '../../models-container.model';

@Component({
  selector: 'app-result',
  templateUrl: './result-detail.component.html'
})
export class ResultDetailComponent implements OnInit {
  private _result: ResultModel;
  total: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private resultsService: ResultsService) { }

  ngOnInit() {
    if (this.router.url.includes('my-results')) {
      this.route.params.subscribe(
        (params: Params) => {
          this.result = this.resultsService.getResultByResultOrder(+params['id']);
        });
    } else {
      this.route.params.subscribe(
        (params: Params) => {
          this.result = this.resultsService.getResultByEmpId(params['id']);
        });
    }
  }

  set result(resultModel: ResultModel) {
    if (!resultModel) {
      this._result = new ResultModel('', new Date(), []);
      return;
    }
    this._result = resultModel;
    this._result.pairs
      .sort((p1, p2) => {
      if (p1.factorName < p2.factorName) return -1;
      if (p1.factorName > p2.factorName) return 1;
    });
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
