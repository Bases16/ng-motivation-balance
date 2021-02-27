import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FactorsService} from '../factors.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FactorsResolver implements Resolve<string[]> {

  constructor(private factorsService: FactorsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.factorsService.getActiveFactorNames()
      .pipe(
        catchError(err => {
          console.log(err);
          return of(undefined);
        })
      );
  }

}
