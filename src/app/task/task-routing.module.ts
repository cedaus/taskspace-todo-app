import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT
import {TaskCategoriesComponent} from './task-categories/task-categories.component';
import {TaskListsComponent} from './task-lists/task-lists.component';
import {AuthGuard} from '../_core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      { path: 'categories', component: TaskCategoriesComponent, canActivate: [AuthGuard]},
      { path: 'list', component: TaskListsComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
