import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UtilService} from '../util.service';
import {AuthResponseDto, User, UserData} from '../models-container.model';


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {}

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.http
      .post(
        environment.serverHost + '/rest/auth/register',
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }
      )
      .pipe(catchError(UtilService.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseDto>(
        environment.serverHost + '/rest/auth/login',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(UtilService.handleError),
        tap(authResp => {
          this.handleAuthentication(+authResp.empId, authResp.email, authResp.token);
        })
      );
  }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;
    const loadedUser = new User(
      userData.empId,
      userData.email,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(empId:number, email: string, encodedToken: string) {

    const tokenPayloadDecoded = atob(encodedToken.match(/\.(.+)\./)[1]);

    const payload = JSON.parse(tokenPayloadDecoded);
    const expirationDate = new Date(payload.exp * 1000);
    const expiresIn = (payload.exp * 1000) - new Date().getTime();
    const userRole = payload.role;

    const user = new User(empId, email, userRole, encodedToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
