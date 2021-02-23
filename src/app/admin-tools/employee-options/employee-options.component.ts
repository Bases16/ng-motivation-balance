import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UtilService} from '../../util.service';

@Component({
  selector: 'app-employee-options',
  templateUrl: './employee-options.component.html',
  styleUrls: ['./employee-options.component.css']
})
export class EmployeeOptionsComponent implements OnInit {
  employee: EmployeeDto;
  pathPart: string = '';

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.employee = this.employeesService.getEmployeeById(params['id']);
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      }
    );
  }

  onChangeRole() {
    this.employeesService.changeRole(this.employee.id)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/' + this.pathPart, this.router),
        error => console.log(error)
      );
  }
  onRemove() {
    this.employeesService.removeEmployee(this.employee.id)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/' + this.pathPart, this.router),
        error => console.log(error)
      );
  }

  onReleaseFromManager() {
    this.employeesService.releaseFromManager(this.employee.id)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/employees-by-manager', this.router),
        error => console.log(error)
      );
  }
}
