import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT
import {ContentComponent} from './content.component';

const routes: Routes = [
  {
    path: 'content',
    children: [
      { path: 'home', component: ContentComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
