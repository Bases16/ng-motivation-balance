import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

export interface EmployeeDto {
  id: string;
  managerId: string;
  firstName: string;
  lastName: string;
  empRole: string;
}

@Injectable({providedIn: 'root'})
export class EmployeesService {
  loadedEmployees: EmployeeDto[] = [];
  newManagerWasChosen = new Subject<number>();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getEmployeesByManagerId(managerId: number): Observable<EmployeeDto[]> {
    return this.http
      .get<EmployeeDto[]>(environment.serverHost + '/rest/emps/by-manager/' + managerId)
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps))
      );
  }

  getEmployeesWithoutManager(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/emps-without-managers/')
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps))
      );
  }

  getAllManagers(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/managers')
      .pipe(
        tap(newEmps => this.updateLoadedEmpsList(newEmps))
      );
  }

  getEmployeeById(id: string) {
    return this.loadedEmployees.find(val => val.id == id);
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
      });
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

  removeEmployee(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/remove', empId);
  }

  changeRole(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/change-role', empId);
  }

  releaseFromManager(empId: string): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/release-from-manager', empId);
  }

  saveAssignation(empId, managerId): Observable<any> {
    return this.http.post(environment.serverHost + '/rest/emps/assign-manager/' + managerId, empId);
  }

}
