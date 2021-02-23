import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../../employees.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-manager-options',
  templateUrl: './manager-options.component.html',
  styleUrls: ['./manager-options.component.css']
})
export class ManagerOptionsComponent implements OnInit {
  manager: EmployeeDto;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.manager = this.employeesService.getEmployeeById(params['id']);
        localStorage.setItem('currentManagerId', this.manager.id);
      }
    );
  }

  onRemove() {

  }

  onChangeRole() {

  }
}
