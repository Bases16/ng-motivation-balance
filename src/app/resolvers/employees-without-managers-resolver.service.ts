import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {EmployeeDto} from '../models-container.model';


@Injectable({providedIn: 'root'})
export class EmployeesWithoutManagerResolver implements Resolve<EmployeeDto[]> {
  constructor(private employeesService: EmployeesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeDto[]> {
    return this.employeesService.getEmployeesWithoutManager()
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }


}
