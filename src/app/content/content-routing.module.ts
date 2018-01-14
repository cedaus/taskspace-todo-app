import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PROJECT

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
