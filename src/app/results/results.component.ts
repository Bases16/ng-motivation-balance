import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {ResultModel} from './result.model';
import {ResultsService} from '../results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  userResults: ResultModel[];

  constructor(private route: ActivatedRoute, private resultsService: ResultsService){ }

  ngOnInit() {
    this.route.data
      .subscribe( (data: Data) => {
        this.userResults = data['results'];
        this.resultsService.userResults = this.userResults;
      });
  }

}
