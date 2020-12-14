import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@shared/constants';
import { ErrorService, ModelMapperService } from '@shared/services';
import { shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from '@shared/models';
import { ReplaySubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {
  private headers = new HttpHeaders();
  private userData = new ReplaySubject<User>();
  user$: ReplaySubject<User> = this.userData;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  login(email: string, password: string) {
    return this.httpClient
      .post(
        `${AppConfig.AuthUrl}`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(shareReplay())
      .toPromise();
  }

  setSession(res: Object) {
    const expiresAt = moment().add(AppConfig.SessionExpiresIn, 'second');
    localStorage.setItem('token', res['token']);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    let user = ModelMapperService.Map(new User({}), res['user']) as User;
    this.userData.next(user);
    //TODO: Check user's role and navigate 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
