import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment.prod';
import {AuthApiService, RawApiService} from '../../_core/services/api.service';
import {User} from '../../_core/models/user.models';

@Injectable()
export class UserService {
  user: Observable<any>;
  userStore: User;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(null as User);
  private USER_URL = `${environment.baseURL}/users`;
  constructor(private raw: RawApiService, private auth: AuthApiService, private router: Router) {
    this.user = this.userSubject.asObservable();
    this.load();
  }
  get user$() {
    return this.userSubject.asObservable().filter((val) => val != null);
  }

  getUser() {
    return this.auth.get(`${this.USER_URL}/info`);
  }
  getUserDetail() {
    return this.auth.get(`${this.USER_URL}/profile/detail/`);
  }
  updateUserDetail(context) {
    return this.auth.post(`${this.USER_URL}/profile/detail/`, JSON.stringify(context));
  }
  getPublicUser(user_id: number) {
    return this.raw.get(`${this.USER_URL}/profile/public-detail/?user_id=${user_id}`);
  }
  load() {
    if (this.userStore) {
      console.log(11);
      return;
    } else {
      this.getUser().subscribe(res => {
        this.userStore = res;
        this.userSubject.next(Object.assign({}, this.userStore));
      });
    }
  }
}
