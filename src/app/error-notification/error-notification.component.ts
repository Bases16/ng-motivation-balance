import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html'
})
export class ErrorNotificationComponent implements OnInit {
  @Input() error: string = 'An unknown error occurred! Please try later.';

  constructor() { }

  ngOnInit() {}

}
