import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddNewWorkshopComponent } from './add-new-workshop/add-new-workshop.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkshopsComponent } from './admin-workshops/admin-workshops.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'set-new-password/:token', component: SetNewPasswordComponent },

  { path: 'add-new-workshop', component: AddNewWorkshopComponent },

  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-workshops', component: AdminWorkshopsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
