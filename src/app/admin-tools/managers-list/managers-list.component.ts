import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../employees.service';
import {ActivatedRoute, Data} from '@angular/router';
import {EmployeeDto} from '../../models-container.model';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html'
})
export class ManagersListComponent implements OnInit {
  managers: EmployeeDto[] = [];

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: Data) => {
        this.managers = data.managers;
      });
  }

}
