import {Component, OnInit} from '@angular/core';
import {EmployeesService} from '../../../employees.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UtilService} from '../../../util.service';
import {EmployeeDto} from '../../../models-container.model';

@Component({
  selector: 'app-manager-options',
  templateUrl: './manager-options.component.html',
  styleUrls: ['./manager-options.component.css']
})
export class ManagerOptionsComponent implements OnInit {
  manager: EmployeeDto;
  error: string;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.manager = this.employeesService.getEmployeeById(params['id']);
        localStorage.setItem('currentManagerId', this.manager.id);
      }
    );
  }

  onRemove() {
    if (confirm('ARE YOU SURE TO DELETE ' + this.manager.firstName
      + ' ' + this.manager.lastName + ' FROM BASE?')) {
      this.employeesService.removeEmployee(this.manager.id)
        .subscribe(
          () => UtilService.redirectTo('/admin-tools/managers-list', this.router),
          error => this.error = error
        );
    }
  }

  onChangeRole() {
    if (confirm('ARE YOU SURE TO MAKE ' + this.manager.firstName
      + ' ' + this.manager.lastName + ' SPECIALIST ? DATA ABOUT SUBORDINATES WILL BE LOST!')) {
      this.employeesService.changeRole(this.manager.id)
        .subscribe(
          () => UtilService.redirectTo('/admin-tools/managers-list', this.router),
          error => this.error = error
        );
    }
  }

}
