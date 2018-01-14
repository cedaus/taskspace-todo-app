import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from '../_core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
