import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {EmployeeDto} from '../models-container.model';


@Injectable({providedIn: 'root'})
export class EmployeesByManagerResolver implements Resolve<EmployeeDto[]> {
  constructor(private employeesService: EmployeesService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeDto[]> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        if (user.empId) {
          return this.employeesService.getEmployeesByManagerId(user.empId);
        } else {
          return this.employeesService
            .getEmployeesByManagerId(+localStorage.getItem('currentManagerId'));
        }
      }),
      catchError(err => {
        console.log(err);
        return of(undefined);
      })
    );
  }


}
