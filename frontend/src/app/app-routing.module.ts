import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddNewWorkshopComponent } from './add-new-workshop/add-new-workshop.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminWorkshopsComponent } from './admin-workshops/admin-workshops.component';
import { BecomeOrganizerComponent } from './become-organizer/become-organizer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { WorkshopsParticipantComponent } from './workshops-participant/workshops-participant.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'set-new-password/:token', component: SetNewPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },

  { path: 'add-new-workshop', component: AddNewWorkshopComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'workshop/:id', component: WorkshopComponent },

  { path: 'become-organizer', component: BecomeOrganizerComponent },

  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-workshops', component: AdminWorkshopsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
