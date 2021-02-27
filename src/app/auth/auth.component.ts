import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {take, tap} from 'rxjs/operators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.error = null;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password)
        .subscribe(resData => {
          this.isLoading = false;
          this.isLoginMode = true;
          this.authService.user.pipe(
            take(1),
            tap(user => {
              if (user.role === 'ADMIN') {
                this.router.navigate(['/admin-tools']);
              } else {
                this.router.navigate(['/new-survey']);
              }
            })).subscribe();
        }, errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        });
    } else {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      this.authService.signUp(email, password, firstName, lastName)
        .subscribe(resData => {
          this.isLoading = false;
          this.router.navigate(['/auth']);
          this.isLoginMode = true;
        }, errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        });
    }
    form.reset();
  }

}
