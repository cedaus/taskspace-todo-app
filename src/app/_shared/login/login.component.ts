import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_core/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  username: string;
  email: any;
  first_name: any;
  last_name: any;
  password: string;
  password1: any;
  password2: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.AUTH_STATE.subscribe(val => {
      if (val) { this.router.navigate(['/tasks/list']); }
    });
  }

  onLogin(): void {
    const creds = {username: this.username, password: this.password};
    this.authService.REDIRECT_URL = ['/tasks/list'];
    this.authService.login(creds);
  }

  onSignup() {
    const context = {username: this.username, email: this.email,
      first_name: this.first_name, last_name: this.last_name, password1: this.password1,
      password2: this.password2};
    this.authService.signup(context);
  }
}
