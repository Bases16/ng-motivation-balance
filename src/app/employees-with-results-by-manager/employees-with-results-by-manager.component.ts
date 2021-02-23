import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {EmployeeDto} from '../employees.service';
import {ResultModel} from '../results/result.model';
import {ResultsService} from '../results.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employees-with-results-by-manager.component.html',
  styleUrls: ['./employees-with-results-by-manager.component.css']
})
export class EmployeesWithResultsByManager implements OnInit {
  employees: EmployeeDto[];
  results: ResultModel[];

  constructor(private route: ActivatedRoute, private resultsService: ResultsService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.employees = data['employees'];
      });
    this.route.data
      .subscribe((data: Data) => {
        this.results = data['results'];
        this.resultsService.userResults = this.results;
        console.log(this.results);
      });
  }

}
