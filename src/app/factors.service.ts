import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

export interface FactorDto {
  name: string;
  status: string
}

@Injectable({providedIn: 'root'})
export class FactorsService {
  constructor(private http: HttpClient) {}

  getActiveFactorNames(): Observable<string[]> {
    return this.http.get<string[]>(environment.serverHost + '/rest/factors/active');
  }

  getAllFactors(): Observable<FactorDto[]> {
    return this.http.get<FactorDto[]>(environment.serverHost + '/rest/factors/manage/all');
  }

  changeFactorStatus(factorName: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/factors/manage/change-status', factorName);
  }

  createNewFactor(factorName: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/factors/manage/create', factorName);
  }

}
