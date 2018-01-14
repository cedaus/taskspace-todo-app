// ANGULAR
import { NgModule } from '@angular/core';
// PROJECT
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {UserProfileComponent} from './user-profile/user-profile.component';

@NgModule({
    imports: [ SharedModule, UserRoutingModule ],
    declarations: [
      UserProfileComponent
    ],
    exports: [],
    providers: []
})

export class UserModule {}
