import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-employees-managing',
  templateUrl: './employees-managing.component.html',
  styleUrls: ['./employees-managing.component.css']
})
export class EmployeesManagingComponent implements OnInit {
  currentEmpList: EmployeeDto[] = [];

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        console.log(data['employees']);
        this.currentEmpList = data['employees'];
      });

  }

}
