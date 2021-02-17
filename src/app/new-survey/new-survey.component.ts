import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {
  activeFactors: string[]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .subscribe( (data: Data) => {
        this.activeFactors = data['activeFactors'];
        // this.factorsService.activeFactors = this.factors;
      });

  }

}
