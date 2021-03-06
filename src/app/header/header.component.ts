import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userRole = '';
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.userRole = user.role;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.isAuthenticated = false;
    this.authService.logout();
  }
}
