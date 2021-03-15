import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {FactorDto} from './models-container.model';
import {catchError} from 'rxjs/operators';
import {UtilService} from './util.service';


@Injectable({providedIn: 'root'})
export class FactorsService {
  constructor(private http: HttpClient) {}

  getActiveFactorNames(): Observable<string[]> {
    return this.http.get<string[]>(environment.serverHost + '/v1/factors/active')
      .pipe(catchError(UtilService.handleError));
  }

  getAllFactors(): Observable<FactorDto[]> {
    return this.http.get<FactorDto[]>(environment.serverHost + '/v1/factors')
      .pipe(catchError(UtilService.handleError));
  }

  changeFactorStatus(factorName: string): Observable<any> {
    return this.http.put(environment.serverHost + '/v1/factors/change-status', factorName)
      .pipe(catchError(UtilService.handleError));
  }

  createNewFactor(factorName: string): Observable<any> {
    return this.http.post(environment.serverHost + '/v1/factors', factorName)
      .pipe(catchError(UtilService.handleError));
  }

}
