import {Injectable} from '@angular/core';
import {ResultModel} from './results/result.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface ResultDto {
  empId: string;
  passDatetime?: string;
  estimationPairs: { factorName: string, estimation: string }[]
}

@Injectable({providedIn: 'root'})
export class ResultsService {
  userResults: ResultModel[]

  constructor(private http: HttpClient) {
  }

  getResultsByEmpId(empId: number): Observable<ResultModel[]> {
    return this.http.get<ResultDto[]>(environment.serverHost + '/rest/results/emp/' + empId)
      .pipe(
        map(resultsResponse => {
          return resultsResponse.map(resResp => {
            return new ResultModel(resResp.empId, new Date(resResp.passDatetime),
              resResp.estimationPairs);
          });
        })
      );
  }

  getEmpResultsByManagerId(managerId: number): Observable<ResultModel[]> {
    return this.http.get<ResultDto[]>
    (environment.serverHost + '/rest/results/by-manager/' + managerId)
      .pipe(
        map(resultsResponse => {
          return resultsResponse.map(resResp => {
            return new ResultModel(resResp.empId, new Date(resResp.passDatetime),
              resResp.estimationPairs);
          });
        })
      );
  }

  getResultByResultOrder(order: number): ResultModel {
    return this.userResults[order];
  }

  getResultByEmpId(empId: string): ResultModel {
    return this.userResults.find(result => result.empId == empId);
  }

  saveResult(resultDto: ResultDto): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/results/save', resultDto)
  }

}
