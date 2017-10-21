import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouteModule } from './route.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from '../common/auth.service';
import { MainService } from './main.service';
import { AuthGuard } from '../common/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouteModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    MainService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
