import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EmployeeDto} from '../models-container.model';

@Injectable({providedIn: 'root'})
export class ManagersResolver implements Resolve<EmployeeDto[]> {
  constructor(private employeesService: EmployeesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeDto[]> {
    return this.employeesService.getAllManagers()
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }

}
