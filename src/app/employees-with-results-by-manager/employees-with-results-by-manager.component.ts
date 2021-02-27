import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {ResultsService} from '../results.service';
import {EmployeeDto, ResultModel} from '../models-container.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employees-with-results-by-manager.component.html'
})
export class EmployeesWithResultsByManagerComponent implements OnInit {
  private _employees: EmployeeDto[];
  results: ResultModel[];
  manager: EmployeeDto;
  resolverFailed = false;

  constructor(private route: ActivatedRoute, private resultsService: ResultsService,
              private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: Data) => {
        if (data.employees === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.employees = data.employees;
      });
    this.route.data
      .subscribe((data: Data) => {
        if (data.results === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.results = data.results;
        this.resultsService.userResults = this.results;
      });
    this.route.params.subscribe(
      (params: Params) => {
        const manager = this.employeesService.getEmployeeById(params.managerId);
        this.manager = manager ? manager : {
          id: 'own', managerId: '', firstName: '', lastName: '', empRole: ''
        };
      });
  }

  get employees(): EmployeeDto[] {
    return this._employees;
  }

  set employees(employees: EmployeeDto[]) {
    this._employees = employees.sort((e1, e2) => {
      if (e1.lastName < e2.lastName) { return -1; }
      if (e1.lastName > e2.lastName) { return 1; }
      else { return 0; }
    });
  }

}
