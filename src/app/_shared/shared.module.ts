// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Form, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
// PROJECT
import {LoginComponent} from './login/login.component';
import {LoaderPageComponent} from './loader-page/loader-page.component';

@NgModule({
  imports:      [CommonModule, HttpClientModule, HttpModule, FormsModule, BrowserAnimationsModule, RouterModule],
  declarations: [
    LoginComponent,
    // Loaders
    LoaderPageComponent
  ],
  exports:      [
    // Modules
    CommonModule, HttpClientModule, HttpModule, FormsModule, RouterModule,
    // Components
    LoginComponent,
    // Loaders
    LoaderPageComponent
  ]
})
export class SharedModule { }
