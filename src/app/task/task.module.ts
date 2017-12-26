// ANGULAR
import { NgModule } from '@angular/core';
// PROJECT
import {TaskRoutingModule} from './task-routing.module';

@NgModule({
    imports: [ SharedModule, TaskRoutingModule ],
    declarations: [
    ],
    exports: [],
    providers: []
})

export class TaskModule {}
