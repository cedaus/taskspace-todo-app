import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// PROJECT
import { AppComponent } from './app.component';
import {TaskModule} from './task/task.module';
import {ContentModule} from './content/content.module';
import {SharedModule} from './_shared/shared.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ContentModule,
    TaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
