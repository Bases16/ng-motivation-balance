import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {concatMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      concatMap(user => {
        if (!user) {
          return next.handle(req);
        } else {
          return next.handle(
            req.clone({headers: req.headers.append('authorization', 'Bearer ' + user.token)})
          );
        }
      })
    );
  }

}
