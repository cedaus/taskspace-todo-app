// ANGULAR
import { NgModule } from '@angular/core';
// PROJECT
import {TaskRoutingModule} from './task-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {TaskCategoriesComponent} from './task-categories/task-categories.component';
import {TaskListsComponent} from './task-lists/task-lists.component';

@NgModule({
    imports: [ SharedModule, TaskRoutingModule ],
    declarations: [
      TaskCategoriesComponent, TaskListsComponent
    ],
    exports: [],
    providers: []
})

export class TaskModule {}
