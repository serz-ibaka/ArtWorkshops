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
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

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
import { AddNewWorkshopComponent } from './add-new-workshop/add-new-workshop.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { AdminWorkshopsComponent } from './admin-workshops/admin-workshops.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { AllWorkshopsComponent } from './all-workshops/all-workshops.component';
import { HeaderComponent } from './header/header.component';
import { WorkshopsParticipantComponent } from './workshops-participant/workshops-participant.component';
import { LocationComponent } from './location/location.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { WorkshopsOrganizerComponent } from './workshops-organizer/workshops-organizer.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { ChatComponent } from './chat/chat.component';
import { BecomeOrganizerComponent } from './become-organizer/become-organizer.component';

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
    AddNewWorkshopComponent,
    LocationInputComponent,
    AdminWorkshopsComponent,
    WorkshopComponent,
    AllWorkshopsComponent,
    HeaderComponent,
    WorkshopsParticipantComponent,
    LocationComponent,
    WorkshopsComponent,
    WorkshopsOrganizerComponent,
    LocationEditComponent,
    ChatComponent,
    BecomeOrganizerComponent,
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
    MatSliderModule,
    MatSortModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatMomentDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
