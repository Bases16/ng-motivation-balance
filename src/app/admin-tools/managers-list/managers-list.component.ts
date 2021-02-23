import { Component, OnInit } from '@angular/core';
import {EmployeeDto, EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.css']
})
export class ManagersListComponent implements OnInit {
  managers: EmployeeDto[] = [];

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.managers = data['managers'];
      });
  }

}
