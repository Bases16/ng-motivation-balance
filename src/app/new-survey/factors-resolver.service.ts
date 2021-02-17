import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FactorsService} from '../factors.service';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FactorsResolver implements Resolve<string[]> {

  constructor(private factorsService: FactorsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.factorsService.getActiveFactors()
      .pipe(
        tap(factors => {
          console.log('log in factor resolver tap()');
          console.log(factors);
          return factors;
        }),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

}
