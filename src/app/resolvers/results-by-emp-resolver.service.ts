import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ResultsService} from '../results.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {catchError, concatMap, take} from 'rxjs/operators';
import {ResultModel} from '../models-container.model';

@Injectable({providedIn: 'root'})
export class ResultsByEmpResolver implements Resolve<ResultModel[]> {

  constructor(private resultService: ResultsService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultModel[]> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        return this.resultService.getResultsByEmpId(user.empId);
      }),
      catchError(err => {
        return of(undefined);
      })
    );
  }

}
