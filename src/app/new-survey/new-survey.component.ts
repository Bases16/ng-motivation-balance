import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ResultResponseData} from '../results/results.service';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  OnClick() {
    let results;

    this.http.get(environment.serverHost + '/rest/results/3')
      .subscribe(data => {
        console.log(data);
        results = data;
      }, error => {
        console.log(error);
      });

  }
}
