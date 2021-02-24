import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-employees-by-manager',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeDto[];
  pathPart: string = '';
  currentManager: EmployeeDto;

  constructor(private route: ActivatedRoute, private router: Router,
              private employeesService: EmployeesService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.employees = data['employees'];
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });

    let currentManagerId = localStorage.getItem('currentManagerId');
    if (currentManagerId) {
      this.currentManager = this.employeesService.getEmployeeById(currentManagerId);
    }
  }
}
