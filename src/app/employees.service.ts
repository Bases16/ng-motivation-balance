import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

export interface EmployeeDto {
  id: string;
  firstName: string;
  lastName: string;
  empRole: string;
}

@Injectable({providedIn: 'root'})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployeesByManagerId(managerId: number): Observable<EmployeeDto[]> {
    return this.http
      .get<EmployeeDto[]>(environment.serverHost + '/rest/emps/by-manager/' + managerId);
  }

}
