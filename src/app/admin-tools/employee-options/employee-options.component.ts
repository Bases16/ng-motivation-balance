import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {UtilService} from '../../util.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-options',
  templateUrl: './employee-options.component.html',
  styleUrls: ['./employee-options.component.css']
})
export class EmployeeOptionsComponent implements OnInit, OnDestroy {
  employee: EmployeeDto;
  pathPart: string = '';
  assignMode: boolean = false;
  newManagerId: number;
  newManagerSub: Subscription;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log('options ngOnInit');
    this.route.params.subscribe(
      (params: Params) => {
        this.employee = this.employeesService.getEmployeeById(params['id']);
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });
    this.assignMode = this.router.url.includes('assign-new-manager');
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        let isOnAssign = this.router.url.includes('assign-new-manager');
        this.assignMode = isOnAssign;
        this.newManagerId = isOnAssign ? this.newManagerId : undefined;
      }
    });
    this.newManagerSub = this.employeesService.newManagerWasChosen
      .subscribe(empId => this.newManagerId = empId);
  }

  ngOnDestroy() {
    this.newManagerSub.unsubscribe();
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

  onSaveAssignation() {
    this.employeesService.saveAssignation(this.employee.id, this.newManagerId)
      .subscribe(
        () => UtilService.redirectTo('/admin-tools/' + this.pathPart, this.router),
        error => console.log(error)
      );
  }
}
