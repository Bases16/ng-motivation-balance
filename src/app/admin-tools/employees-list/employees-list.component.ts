import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-employees-by-manager',
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit {
  _employees: EmployeeDto[];
  pathPart = '';
  manager: EmployeeDto;
  resolverFailed = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: Data) => {
        if (data.employees === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.employees = data.employees;
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });
    this.route.params.subscribe(
      (params: Params) => {
        const manager = this.employeesService.getEmployeeById(params.managerId);
        this.manager = manager ? manager : {
          id: '', managerId: '', firstName: '', lastName: '', empRole: ''
        };
      });
  }

  get employees(): EmployeeDto[] {
    return this._employees;
  }

  set employees(employees: EmployeeDto[]) {
    this._employees = employees.sort((e1, e2) => {
      if (e1.lastName < e2.lastName) { return -1; }
      if (e1.lastName > e2.lastName) { return 1; }
      else { return 0; }
    });
  }
}
