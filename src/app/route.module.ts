import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AddListComponent } from './add-list/add-list.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { CodesComponent } from './codes/codes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './404/404.component';

import { AuthGuard } from '../common/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'add', canActivate: [ AuthGuard ], component: AddListComponent },
  { path: 'codes', canActivate: [ AuthGuard ], component: CodesComponent },
  { path: 'history', canActivate: [ AuthGuard ], component: HistoryComponent },
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logo', canActivate: [ AuthGuard ], component: LogoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update/:id', canActivate: [ AuthGuard ], component: UpdateListComponent },

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

// list name
