import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// PROJECT
import { AppComponent } from './app.component';
import {TaskModule} from './task/task.module';
import {ContentModule} from './content/content.module';
import {SharedModule} from './_shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthApiService, RawApiService} from './_core/services/api.service';
import {AuthService} from './_core/services/auth.service';
import {StorageService} from './_core/services/storage.service';
import {UserService} from './_core/services/user.service';
import {TaskService} from './_core/services/task.service';

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
  providers: [AuthApiService, RawApiService, AuthService, StorageService, UserService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
