import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../../employees.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UtilService} from '../../../util.service';

@Component({
  selector: 'app-manager-options',
  templateUrl: './manager-options.component.html',
  styleUrls: ['./manager-options.component.css']
})
export class ManagerOptionsComponent implements OnInit {
  manager: EmployeeDto;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.manager = this.employeesService.getEmployeeById(params['id']);
        localStorage.setItem('currentManagerId', this.manager.id);
      }
    );
  }

  onRemove() {
    this.employeesService.removeEmployee(this.manager.id)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/managers-list', this.router),
        error => console.log(error)
      );
  }

  onChangeRole() {
    this.employeesService.changeRole(this.manager.id)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/managers-list', this.router),
        error => console.log(error)
      );
  }
}
