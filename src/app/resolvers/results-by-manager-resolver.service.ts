import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {ResultsService} from '../results.service';
import {ResultModel} from '../models-container.model';


@Injectable({providedIn: 'root'})
export class ResultsByManagerResolver implements Resolve<ResultModel[]> {
  constructor(private resultsService: ResultsService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultModel[]> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        if (user.empId) {
          return this.resultsService.getEmpResultsByManagerId(user.empId);
        } else {
          return this.resultsService
            .getEmpResultsByManagerId(+localStorage.getItem('currentManagerId'));
        }
      }),
      catchError(err => {
        console.log(err);
        return of(undefined);
      })
    );
  }


}
