import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UtilService} from './util.service';
import {EmployeeDto} from './models-container.model';


@Injectable({providedIn: 'root'})
export class EmployeesService {
  loadedEmployees: EmployeeDto[] = [];
  newManagerWasChosen = new Subject<number>();

  constructor(private http: HttpClient) {}

  getEmployeeById(id: string) {
    return this.loadedEmployees.find(val => val.id == id);
  }

  getEmployeesByManagerId(managerId: number): Observable<EmployeeDto[]> {
    return this.http
      .get<EmployeeDto[]>(environment.serverHost + '/rest/emps/by-manager/' + managerId)
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps)),
        catchError(UtilService.handleError)
      );
  }

  getEmployeesWithoutManager(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/emps-without-managers/')
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps)),
        catchError(UtilService.handleError)
      );
  }

  getAllManagers(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/managers')
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps)),
        catchError(UtilService.handleError)
      );
  }

  searchEmployee(fir: string, sec: string): Observable<EmployeeDto[]> {
    let params: HttpParams;
    if (fir && sec) {
      params = new HttpParams().set('first', fir).set('second', sec);
    } else {
      params = new HttpParams().set('first', fir);
    }
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/search-employee',
      {
        params: params
      })
      .pipe(catchError(UtilService.handleError));
  }

  removeEmployee(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/remove', empId)
      .pipe(catchError(UtilService.handleError));
  }

  changeRole(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/change-role', empId)
      .pipe(catchError(UtilService.handleError));
  }

  releaseFromManager(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/release-from-manager', empId)
      .pipe(catchError(UtilService.handleError));
  }

  saveAssignation(empId, managerId): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/assign-manager/' + managerId, empId)
      .pipe(catchError(UtilService.handleError));
  }

  private updateLoadedEmpsList(emps: EmployeeDto[]) {
    for (let emp of emps) {
      let oldEmp = this.loadedEmployees.find(val => val.id == emp.id);
      if (oldEmp == undefined) {
        this.loadedEmployees.push(emp);
      } else {
        this.loadedEmployees[emps.indexOf(oldEmp)] = emp;
      }
    }
  }

}
