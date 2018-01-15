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
  firstName: any;
  lastName: any = '';
  password: string;
  passwordRepeat: any;
  register: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.AUTH_STATE.subscribe(val => {
      if (val) { this.router.navigate(['/tasks/list']); }
    });
  }
  toggleRegister(bool: boolean) {
   if (bool) {
     this.register = true;
   } else {
     this.register = false;
   }
  }

  onLogin(): void {
    const creds = {username: this.username, password: this.password};
    this.authService.REDIRECT_URL = ['/tasks/list'];
    this.authService.login(creds);
  }

  onSignup() {
    const context = {username: this.email, email: this.email,
      first_name: this.firstName, last_name: this.lastName, password1: this.password,
      password2: this.passwordRepeat};
    this.authService.signup(context);
  }
}
