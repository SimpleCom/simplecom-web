import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AddListComponent } from './add-list/add-list.component';
import { CodesComponent } from './codes/codes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './404/404.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'add', component: AddListComponent },
  { path: 'codes', component: CodesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logo', component: LogoComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent },

  // { path: 'home/:id', component: HomeComponent },
  // { path: 'asdf/:id', canActivate: [ AuthGuard ], component: asdf },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RouteModule { }

// /user/login
// uname | pass
// /user/register
// uname | pass
