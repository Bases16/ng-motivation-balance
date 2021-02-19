import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {EmployeeDto} from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeDto[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe( (data: Data) => {
        this.employees = data['employees'];
      });
  }

}
