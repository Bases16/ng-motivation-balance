import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../../employees.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-emp-manage',
  templateUrl: './emp-manage.component.html',
  styleUrls: ['./emp-manage.component.css']
})
export class EmpManageComponent implements OnInit {
  employee: EmployeeDto;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.employee = this.employeesService.getEmployeeById(params['id']);
      }
    );
  }

  onRemove(empId: string) {
    this.employeesService.removeEmployee(empId);
  }

  onChangeRole(empId: string) {
    this.employeesService.changeRole(empId);
  }
}
