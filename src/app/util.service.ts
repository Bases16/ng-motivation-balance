import {Injectable} from '@angular/core';
import { Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UtilService {

  public static redirectTo(uri: string, router: Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => router.navigate([uri]));
  }

  public static handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred! Please try later.';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'user with such email already exists.';
        break;
      case 'BAD_CREDENTIALS':
        errorMessage = 'combination email/password is invalid';
        break;
    }
    return throwError(errorMessage);
  }

}
