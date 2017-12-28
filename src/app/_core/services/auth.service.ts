import {Injectable} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// Project
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {RawApiService} from './api.service';
import {environment} from '../../../environments/environment.prod';
import {UserService} from './user.service';

@Injectable()
export class AuthService {
  private bSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  state: Observable<boolean> = this.bSubject.asObservable();
  token: string;
  AUTH_URL = `${environment.baseURL}/authe`;
  REDIRECT_URL: any;
  constructor (
    private http: HttpClient, private raw: RawApiService,
    private storageService: StorageService, private router: Router,
    private userService: UserService) {
    this.load();
  }
  //
  login(creds) {
    this.http.post(`${this.AUTH_URL}/api-token-auth/`, creds).subscribe(response => {
      if (response['token']) {
        this.storageService.set('token', response['token']);
        this.token = response['token'];
        this.bSubject.next(true);
        this.postLogin();
        return true;
      } else { return false; }
    });
  }
  logout(): void {
    this.token = null;
    this.storageService.remove('token');
    this.bSubject.next(false);
    this.postLogout();
  }
  signup(context) {
    this.raw.put(`${this.AUTH_URL}/email-auth/`, context).subscribe(data => {
      const creds = {username: data.username, password: data.password};
      this.REDIRECT_URL = ['/user/profile'];
      this.login(creds);
    });
  }
  passwordReset(context) {
    this.http.post(`${this.AUTH_URL}/password-reset/`, context).subscribe(data => {
      this.logout();
    });
  }
  //
  public authenticated() {
    return tokenNotExpired('token', this.token);
  }
  //
  load() {
    this.token = this.storageService.get('token');
    this.bSubject.next(tokenNotExpired('token', this.token));
  }
  redirect() {
    if (this.REDIRECT_URL) {
      const url = this.REDIRECT_URL;
      this.REDIRECT_URL = null;
      this.router.navigate(url);
    } else {
      window.location.reload();
    }
  }
  //
  postLogin() {
    this.userService.load();
    this.redirect();
  }
  postLogout() {
    this.redirect();
  }
}
