import { Component, OnInit } from '@angular/core';
import {EmployeeDto} from '../../employees.service';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-employees-by-manager',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeDto[];
  pathPart: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.employees = data['employees'];
        this.pathPart = this.router.url.includes('employees-by-manager')
          ? 'employees-by-manager' : 'employees-without-manager';
      });
  }
}
