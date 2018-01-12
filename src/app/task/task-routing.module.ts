import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT
import {TaskCategoriesComponent} from './task-categories/task-categories.component';
import {TaskListsComponent} from './task-lists/task-lists.component';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      { path: 'categories', component: TaskCategoriesComponent},
      { path: 'list', component: TaskListsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
