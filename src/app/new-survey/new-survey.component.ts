import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ResultsService} from '../results.service';
import {AuthService} from '../auth/auth.service';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {
  @ViewChild('ngForm') surveyForm: NgForm;
  activeFactors: string[];
  empId: number;
  error: string;
  resolverFailed = false;
  successSend = false;

  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        if (data['activeFactors'] === undefined) {
          this.resolverFailed = true;
          return;
        }
        this.activeFactors = data['activeFactors'];
      });
    this.authService.user.pipe(
      take(1),
      tap(user => this.empId = user.empId)
    ).subscribe();
  }

  onSubmit() {
    this.successSend = false;

    let estimationPairs: { factorName: string, estimation: string }[] = [];

    this.activeFactors.forEach(factor => {
      estimationPairs.push(
        {factorName: factor, estimation: this.surveyForm.value[factor]}
      );
    });
    this.resultsService.saveResult({
      empId: '' + this.empId, estimationPairs: estimationPairs
    }).subscribe(
      () => this.successSend = true,
      error => this.error = error
    );

    this.surveyForm.reset();
  }

}
