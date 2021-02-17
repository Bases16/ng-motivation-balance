import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ResultModel} from './result.model';
import {Observable, of, throwError} from 'rxjs';
import {ResultsService} from './results.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {catchError, concatMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ResultsResolver implements Resolve<ResultModel[]> {

  constructor(private resultService: ResultsService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<ResultModel[]> | Promise<ResultModel[]> | ResultModel[] {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        return this.resultService.getResultsObservableByEmpId(user.id)
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }


}