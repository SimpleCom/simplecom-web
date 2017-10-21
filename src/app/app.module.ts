import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouteModule } from './route.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth.service';
import { MainService } from './main.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
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
