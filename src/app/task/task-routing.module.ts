import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT
import {TaskCategoriesComponent} from './task-categories/task-categories.component';

const routes: Routes = [
  {
    path: 'task',
    children: [
      { path: 'categories', component: TaskCategoriesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
