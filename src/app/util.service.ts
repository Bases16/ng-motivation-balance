import {Injectable} from '@angular/core';
import { Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UtilService {
  constructor() {}

  public static redirectTo(uri: string, router: Router) {
    router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => router.navigate([uri]));
  }
}
