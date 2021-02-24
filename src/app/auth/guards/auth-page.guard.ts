import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({providedIn: 'root'})
export class AuthPageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return true;
        } else if (user.role === 'ADMIN') {
          return this.router.createUrlTree(['/admin-tools']);
        } else {
          return this.router.createUrlTree(['/new-survey']);
        }
      }));
  }

}
