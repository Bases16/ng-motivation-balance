import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {EmployeeDto} from '../models-container.model';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class ManagersResolver implements Resolve<EmployeeDto[]> {
  constructor(private employeesService: EmployeesService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeDto[]> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        if (user.role === 'MANAGER') { return of(null); }
        return this.employeesService.getAllManagers();
      }),
      catchError(() => {
        return of(undefined);
      })
    );
  }

}
