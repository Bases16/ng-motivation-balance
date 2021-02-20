import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface EstimationPairDto {
  factorName: string;
  estimation: string;
}

@Injectable({providedIn: 'root'})
export class StatsService {

  constructor(private http: HttpClient) {}

  getAllRelevEstimPairs(): Observable<EstimationPairDto[]> {
    return this.http
      .get<EstimationPairDto[]>(environment.serverHost + '/rest/stats/all-relev-pairs');
  }
}
