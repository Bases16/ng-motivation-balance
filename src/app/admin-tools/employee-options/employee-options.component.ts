import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-employee-options',
  templateUrl: './employee-options.component.html',
  styleUrls: ['./employee-options.component.css']
})
export class EmployeeOptionsComponent implements OnInit {
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
}
