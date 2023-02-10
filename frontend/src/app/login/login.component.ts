import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private accountService: AccountService, private router: Router) {}

  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword = true;
  message = '';

  login() {
    this.accountService
      .login({
        username: this.formGroup.get('username')?.value,
        password: this.formGroup.get('password')?.value,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'error') {
          this.message = res['message'];
        } else {
          localStorage.setItem('username', res['username']);
          localStorage.setItem('type', res['type']);
          this.router.navigate(['/']);
        }
      });
  }
}
