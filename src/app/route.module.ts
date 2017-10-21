import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AddListComponent} from "./add-list/add-list.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'home/:id', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: '**', redirectTo: '' },
  // { path: 'asdf/:id', canActivate: [ AuthGuard ], component: asdf },

  // { path: '**', redirectTo: '/404' },
  // { path: '404', component: NotFoundComponent },
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
