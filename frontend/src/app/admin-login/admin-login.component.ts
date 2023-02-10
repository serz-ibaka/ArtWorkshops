import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(private adminService: AdminService, private router: Router) {}

  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword = true;
  message = '';

  login() {
    this.adminService
      .adminLogin({
        username: this.formGroup.get('username')?.value,
        password: this.formGroup.get('password')?.value,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'error') {
          this.message = res['message'];
        } else {
          localStorage.setItem('type', 'administrator');
          localStorage.setItem('username', 'admin');
          this.router.navigate(['/admin-home']);
        }
      });
  }
}
