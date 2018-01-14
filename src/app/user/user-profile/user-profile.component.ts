import {Component, OnInit} from '@angular/core';
// PROJECT
import {UserService} from '../../_core/services/user.service';
import {User} from '../../_core/models/user.models';
import {AuthService} from '../../_core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: []
})

export class UserProfileComponent implements OnInit {
  user: any;
  edit: boolean = false;
  constructor(private userService: UserService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(data => {
      this.user = new User(data);
    });
  }
  editProfile() {
    console.log(this.user);
    this.edit = true;
  }
  updateProfile() {
    const context = this.user;
    this.userService.updateUserDetail(context).subscribe(data => {
      this.user = data;
      this.edit = false;
    });
  }
  onLogout(): void {
    this.authService.REDIRECT_URL = ['/login'];
    this.authService.logout();
  }
}
