import {Injectable} from '@angular/core';
import {ResultModel} from './result.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface ResultResponseData {
  employeeId: string;
  passingDatetime: string;
  estimationPairs: { factorName: string, estimation: string }[]
}

@Injectable({providedIn: 'root'})
export class ResultsService {
  constructor(private http: HttpClient,
              private router: Router) {
  }

  getResultsByEmpId(empId: string): /*ResultModel[]*/ ResultResponseData{

    let results: ResultResponseData;

    this.http.get<ResultResponseData>(environment.serverHost + '/rest/results/' + empId)
      // .pipe(
      //   map(results => {
      //     return results
      //
      //   }))
      .subscribe(data => {
        console.log(data);
        results = data;
      }, error => {
        console.log(error);
      });


    return results;
  }
}
