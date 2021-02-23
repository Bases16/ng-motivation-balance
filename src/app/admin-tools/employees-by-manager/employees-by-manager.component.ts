import { Component, OnInit } from '@angular/core';
import {EmployeeDto} from '../../employees.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-employees-by-manager',
  templateUrl: './employees-by-manager.component.html',
  styleUrls: ['./employees-by-manager.component.css']
})
export class EmployeesByManagerComponent implements OnInit {
  employees: EmployeeDto[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.employees = data['employees'];
      });
  }
}
