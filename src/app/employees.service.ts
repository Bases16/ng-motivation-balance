import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getEmployeesByManagerId(managerId: number): Observable<EmployeeDto[]> {
    return this.http
      .get<EmployeeDto[]>(environment.serverHost + '/rest/emps/by-manager/' + managerId)
      .pipe(
        tap(newEmps => this.addNotLoadedEmpsYet(newEmps))
      );
  }

  getAllManagers(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(environment.serverHost + '/rest/emps/managers')
      .pipe(
        tap(newEmps => this.addNotLoadedEmpsYet(newEmps))
      );
  }

  getEmployeeById(id: string) {
    return this.loadedEmployees.find(val => val.id == id);
  }

  private addNotLoadedEmpsYet(emps: EmployeeDto[]) {
    for (let emp of emps) {
      let oldEmp = this.loadedEmployees.find(val => val.id == emp.id);
      if (oldEmp == undefined) {
        this.loadedEmployees.push(emp);
      } else {
        this.loadedEmployees[emps.indexOf(oldEmp)] = emp;
      }
    }
  }

  removeEmployee(empId: string) {
    this.http.post(environment.serverHost + '/rest/emps/remove', empId)
      .subscribe(
        () => {
          // this.router.navigate(['../'], {relativeTo: this.route});
          this.router.navigate(['/admin-tools/employees-managing']);

        },
        error => console.log(error)
      );
  }

  changeRole(empId: string) {
    this.http.post(environment.serverHost + '/rest/emps/change-role', empId)
      .subscribe(resp => {
      }, error => console.log(error));
  }

}
