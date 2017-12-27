// ANGULAR
import { NgModule } from '@angular/core';
// PROJECT
import {SharedModule} from '../_shared/shared.module';
import {ContentRoutingModule} from './content-routing.module';
import {ContentComponent} from './content.component';

@NgModule({
    imports: [ SharedModule, ContentRoutingModule ],
    declarations: [
      ContentComponent
    ],
    exports: [],
    providers: []
})

export class ContentModule {}
