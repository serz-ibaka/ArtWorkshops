import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HeaderUnregisteredComponent } from './header-unregistered/header-unregistered.component';
import { HeaderParticipantComponent } from './header-participant/header-participant.component';
import { HeaderOrganizerComponent } from './header-organizer/header-organizer.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeUnregisteredComponent } from './home-unregistered/home-unregistered.component';
import { HomeOrganizerComponent } from './home-organizer/home-organizer.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeParticipantComponent } from './home-participant/home-participant.component';
import { HomeComponent } from './home/home.component';
import { AccountParticipantComponent } from './account-participant/account-participant.component';
import { AccountOrganizerComponent } from './account-organizer/account-organizer.component';
import { AccountComponent } from './account/account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminLoginComponent,
    AdminUsersComponent,
    AdminHomeComponent,
    HeaderUnregisteredComponent,
    HeaderParticipantComponent,
    HeaderOrganizerComponent,
    HeaderAdminComponent,
    LogoutComponent,
    HomeUnregisteredComponent,
    HomeOrganizerComponent,
    HomeAdminComponent,
    HomeParticipantComponent,
    HomeComponent,
    AccountParticipantComponent,
    AccountOrganizerComponent,
    AccountComponent,
    AccountInfoComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
