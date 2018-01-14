import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
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
import {AuthGuard} from './_core/guards/auth.guard';
import {AuthInterceptor} from './_core/factories/auth.factory';
import {ServiceLocator} from './_core/factories/service-location.factory';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ContentModule,
    TaskModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    // Authentication
    AuthService, AuthGuard, AuthApiService,
    // Others
    RawApiService, StorageService, UserService, TaskService,
    // Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
