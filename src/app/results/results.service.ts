import {Injectable} from '@angular/core';
import {ResultModel} from './result.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface ResultResponseData {
  empId: string;
  passDatetime: string;
  estimationPairs: { factorName: string, estimation: string }[]
}

@Injectable({providedIn: 'root'})
export class ResultsService {
  userResults: ResultModel[]

  constructor(private http: HttpClient) {
  }

  getResultsByEmpId(empId: number): Observable<ResultModel[]> {
    return this.http.get<ResultResponseData[]>(environment.serverHost + '/rest/results/' + empId)
      .pipe(
        map(resultsResponse => {
          console.log('resultsResponse');
          console.log(resultsResponse);

          return resultsResponse.map(resResp => {
            return new ResultModel(resResp.empId, new Date(resResp.passDatetime),
              resResp.estimationPairs);
          });
        })
      );
  }

  getResultByEmpId(empId: number): ResultModel {
    return this.userResults[empId];
  }

}
