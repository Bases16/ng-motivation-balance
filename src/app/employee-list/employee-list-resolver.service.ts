import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmployeeDto, EmployeesService} from '../employees.service';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class EmployeeListResolver implements Resolve<EmployeeDto[]> {
  constructor(private employeesService: EmployeesService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeDto[]> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        return this.employeesService.getEmployeesByManagerId(user.empId)
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }


}
