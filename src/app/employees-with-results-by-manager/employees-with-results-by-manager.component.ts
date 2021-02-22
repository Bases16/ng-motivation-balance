import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {EmployeeDto} from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employees-with-results-by-manager.component.html',
  styleUrls: ['./employees-with-results-by-manager.component.css']
})
export class EmployeesWithResultsByManager implements OnInit {
  employees: EmployeeDto[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        console.log(data['employees']);
        this.employees = data['employees'];
      });
  }

}
