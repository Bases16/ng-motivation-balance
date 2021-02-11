import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ManagerPagesAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {

    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/auth']);
        } else if (user.role === 'MANAGER') {
          return true;
        } else {
          return this.router.createUrlTree(['/access-denied']);
        }
      }));
  }

}
