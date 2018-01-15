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
  //
  error = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.AUTH_STATE.subscribe(val => {
      if (val) { this.router.navigate(['/tasks/list']); }
    });
  }
  toggleRegister(bool: boolean) {
    this.error = null;
   if (bool) {
     this.register = true;
   } else {
     this.register = false;
   }
  }

  onLogin(): void {
    this.error = null;
    if (this.validate()) {
      const creds = {username: this.email, password: this.password};
      this.authService.REDIRECT_URL = ['/tasks/list'];
      this.authService.login(creds);
    }
  }

  onSignup() {
    this.error = null;
    if (this.validate()) {
      const context = {username: this.email, email: this.email,
      first_name: this.firstName, last_name: this.lastName, password1: this.password,
      password2: this.passwordRepeat};
      this.authService.signup(context);
    }
  }

  validate() {
    if (!this.email) {
      this.error = 'Please fill your email';
      return false;
    } else if (!this.password) {
      this.error = 'Please fill password';
      return false;
    } else if (this.register && !this.firstName) {
      this.error = 'Please fill your name';
      return false;
    } else if (this.register && !this.passwordRepeat) {
      this.error = 'Please repeat your password';
      return false;
    } else if (this.register && (this.password !== this.passwordRepeat)) {
      this.error = 'Please ensure both passwords are same';
      return false;
    }
    return true;
  }
}
