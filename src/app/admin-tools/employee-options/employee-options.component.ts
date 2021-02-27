import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {UtilService} from '../../util.service';
import {Subscription} from 'rxjs';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-employee-options',
  templateUrl: './employee-options.component.html'
})
export class EmployeeOptionsComponent implements OnInit, OnDestroy {
  employee: EmployeeDto;
  pathPart = '';
  assignMode = false;
  currentManagerId = '';
  newManagerId: number;
  newManagerSub: Subscription;
  error: string;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.employee = this.employeesService.getEmployeeById(params.id);
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });
    this.assignMode = this.router.url.includes('assign-new-manager');
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        const isOnAssign = this.router.url.includes('assign-new-manager');
        this.assignMode = isOnAssign;
        this.newManagerId = isOnAssign ? this.newManagerId : undefined;
      }
    });
    this.newManagerSub = this.employeesService.newManagerWasChosen
      .subscribe(empId => this.newManagerId = empId);

    if (this.router.url.includes('employees-by-manager')) {
      this.currentManagerId = this.router.url.match(/manager\/(\d+)/)[1];
    }
  }

  ngOnDestroy(): void {
    this.newManagerSub.unsubscribe();
  }

  onChangeRole(): void {
    if (confirm('ARE YOU SURE TO MAKE ' + this.employee.firstName
                                  + ' ' + this.employee.lastName + ' MANAGER ?')) {
      this.employeesService.changeRole(this.employee.id)
        .subscribe(
          () => UtilService.redirectTo(
            '/admin-tools/' + this.pathPart + '/' + this.currentManagerId, this.router),
          error => this.error = error
        );
    }
  }

  onRemove(): void {
    if (confirm('ARE YOU SURE TO DELETE ' + this.employee.firstName
      + ' ' + this.employee.lastName + ' FROM BASE')) {
      this.employeesService.removeEmployee(this.employee.id)
        .subscribe(
          () => UtilService.redirectTo(
            '/admin-tools/' + this.pathPart + '/' + this.currentManagerId, this.router),
          error => this.error = error
        );
    }
  }

  onReleaseFromManager(): void {
    if (confirm('ARE YOU SURE TO RELEASE ' + this.employee.firstName
                       + ' ' + this.employee.lastName + ' FROM CURRENT MANAGER ?')) {
      this.employeesService.releaseFromManager(this.employee.id)
        .subscribe(
          () => UtilService.redirectTo(
            '/admin-tools/employees-by-manager/' + this.currentManagerId, this.router),
          error => this.error = error
        );
    }
  }

  onSaveAssignation(): void {
    this.employeesService.saveAssignation(this.employee.id, this.newManagerId)
      .subscribe(
        () => UtilService.redirectTo(
          '/admin-tools/' + this.pathPart + '/' + this.currentManagerId, this.router),
        error => this.error = error
      );
  }
}
