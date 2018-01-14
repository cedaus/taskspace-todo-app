import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// PROJECT
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.models';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  auth: boolean;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.AUTH_STATE.subscribe(val => this.auth = val);
    const url: string = state.url;
    if (!this.checkLogin(url)) {
      return Observable.of(false);
    } else {
      return Observable.of(true);
    }
  }
  checkLogin(url) {
    if (this.auth) {
      return true;
    } else {
      this.authService.REDIRECT_URL = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
