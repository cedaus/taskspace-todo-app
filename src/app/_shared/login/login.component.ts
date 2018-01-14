import {Component, Input} from '@angular/core';
import {AuthService} from '../../_core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
  username: string;
  email: any;
  first_name: any;
  last_name: any;
  password: string;
  password1: any;
  password2: any;

  constructor(private authService: AuthService) { }

  onLogin(): void {
    const creds = {username: this.username, password: this.password};
    this.authService.REDIRECT_URL = ['/chat'];
    this.authService.login(creds);
  }

  onSignup() {
    const context = {username: this.username, email: this.email,
      first_name: this.first_name, last_name: this.last_name, password1: this.password1,
      password2: this.password2};
    this.authService.signup(context);
  }
}
