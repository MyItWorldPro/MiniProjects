import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { UserPageComponent } from './user-page/user-page.component';
import { Roles } from '../app/models/roles';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN] }
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.USER] }
  },
  {
    path: '**',
    component: UnauthorisedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
