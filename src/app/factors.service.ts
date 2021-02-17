import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class FactorsService {
  constructor(private http: HttpClient) {}

  getActiveFactors(): Observable<string[]> {
    return this.http.get<string[]>(environment.serverHost + '/rest/factors');
  }
}
