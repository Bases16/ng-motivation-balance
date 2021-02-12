import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ResultModel} from './result.model';
import {Observable} from 'rxjs';
import {ResultResponseData, ResultsService} from './results.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ResultsResolver implements /*Resolve<ResultModel[]>*/ Resolve<ResultResponseData> {

  constructor(private resultService: ResultsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<ResultResponseData> | Promise<ResultResponseData> | ResultResponseData {

    let resultsByEmpId = this.resultService.getResultsByEmpId('3');

    return resultsByEmpId;
  }



}
