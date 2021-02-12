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

    this.http.post(environment.serverHost + '/rest/results/3',
      {uuu:'xuinya'},
      {
        headers: new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGVjM0B0ZXN0LmNvbSIsInJvbGUiOiJTUEVDSUFMSVNUIiwiaWF0IjoxNjEzMTM2MDAzLCJleHAiOjE2MTMyMjI0MDN9.IiAicENkiE1In94xKBN8Ksl1Q5OZzdAzbNuZKH44ENA'})
      })
      .subscribe(data => {
        console.log(data);
        results = data;
      }, error => {
        console.log(error);
      });

  }
}
