import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-employees-by-manager',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeDto[];
  pathPart: string = '';
  manager: EmployeeDto;

  constructor(private route: ActivatedRoute, private router: Router,
              private employeesService: EmployeesService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.employees = data['employees'];
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });
    this.route.params.subscribe(
      (params: Params) => {
        let manager = this.employeesService.getEmployeeById(params['managerId']);
        this.manager = manager ? manager : {
          id: '', managerId: '', firstName: '', lastName: '', empRole: ''
        }
      });
  }
}
