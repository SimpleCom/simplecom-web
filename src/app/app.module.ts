import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RouteModule } from './route.module';

import { AppComponent } from './app.component';

import { AddListComponent } from "./add-list/add-list.component";
import { CodesComponent } from "./codes/codes.component";
import { HistoryComponent } from "./history/history.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './404/404.component';

import { AuthService } from '../common/auth.service';
import { MainService } from './main.service';
import { AuthGuard } from '../common/auth-guard.service';
import { AddListService } from "./add-list/add-list.service";
import { JWTService } from "../common/jwt.service";
import { RestService } from "../common/rest.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    AddListComponent,
    CodesComponent,
    HistoryComponent,
    HomeComponent,
    LoginComponent,
    LogoComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    MainService,
    JWTService,
    RestService,
    AddListService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
