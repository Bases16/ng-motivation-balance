/* tslint:disable:triple-equals */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResultDto, ResultModel} from './models-container.model';
import {UtilService} from './util.service';


@Injectable({providedIn: 'root'})
export class ResultsService {
  userResults: ResultModel[];

  constructor(private http: HttpClient) {}

  getResultByResultOrder(order: number): ResultModel {
    return this.userResults[order];
  }

  getResultByEmpId(empId: string): ResultModel {
    return this.userResults.find(result => result.empId == empId);
  }

  saveResult(resultDto: ResultDto): Observable<any> {
    return this.http.post(environment.serverHost + '/v1/results/', resultDto)
      .pipe(catchError(UtilService.handleError));
  }

  getResultsByEmpId(empId: number): Observable<ResultModel[]> {
    return this.http.get<ResultDto[]>(environment.serverHost + '/v1/emps/' + empId + '/results')
      .pipe(
        map(resultsResponse => {
          return resultsResponse.map(resResp => {
            return new ResultModel(resResp.empId, new Date(resResp.passDatetime),
              resResp.estimationPairs);
          });
        }),
        catchError(UtilService.handleError)
      );
  }

  getEmpResultsByManagerId(managerId: number): Observable<ResultModel[]> {
    return this.http.get<ResultDto[]>
    (environment.serverHost + '/v1/emps/by-manager/' + managerId + '/results/relevant')
      .pipe(
        map(resultsResponse => {
          return resultsResponse.map(resResp => {
            return new ResultModel(resResp.empId, new Date(resResp.passDatetime),
              resResp.estimationPairs);
          });
        }),
        catchError(UtilService.handleError)
      );
  }

}
