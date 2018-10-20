import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouteModule } from './route.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';

import { UpdateListComponent } from './update-list/update-list.component';
import { CodesComponent } from './codes/codes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './404/404.component';
import { UploaderComponent } from './uploader/uploader.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OrganizationComponent } from './organization/organization.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';

import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';

import { AuthService } from '../common/auth.service';
import { AppService } from './app.service';
import { AuthGuard } from '../common/auth-guard.service';
import { JWTService } from '../common/jwt.service';
import { RestService } from '../common/rest.service';
import { HttpModule } from '@angular/http';
import { HomeService } from './home/home.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { UploaderService } from './uploader/uploader.service';
import { UserService } from './user/user.service';
import { OrganizationService } from './organization/organization.service';
import { EditUserService } from './edit-user/edit-user.service';

@NgModule({
  declarations: [
    AppComponent,
    UpdateListComponent,
    CodesComponent,
    HistoryComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    NavButtonsComponent,
    UploaderComponent,
    ChangePasswordComponent,
    UserComponent,
    OrganizationComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AppService,
    JWTService,
    RestService,
    HomeService,
    LoginService,
    RegisterService,
    UploaderService,
    UserService,
    OrganizationService,
    EditUserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
