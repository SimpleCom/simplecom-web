import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { UpdateListComponent } from './update-list/update-list.component';
import { CodesComponent } from './codes/codes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './404/404.component';

import { AuthGuard } from '../common/auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrganizationComponent } from './organization/organization.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'codes', canActivate: [ AuthGuard ], component: CodesComponent },
  { path: 'history', canActivate: [ AuthGuard ], component: HistoryComponent },
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'change-password', canActivate: [ AuthGuard ], component: ChangePasswordComponent },
  { path: 'register', canActivate: [ AuthGuard ], component: RegisterComponent  },
  { path: 'organizations', canActivate: [ AuthGuard ], component: OrganizationComponent  },
  { path: 'users', canActivate: [ AuthGuard ], component: UserComponent  },
  { path: 'users/:id', canActivate: [ AuthGuard ], component: EditUserComponent  },
  { path: 'update/:id', canActivate: [ AuthGuard ], component: UpdateListComponent },
  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent },
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
