import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  email = '';
  message = '';

  sendLink() {
    this.userService
      .forgotPassword({ email: this.email })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          const form = document.getElementById('form');
          const message = document.getElementById('message');
          if (form) {
            form.style.display = 'none';
          }
          if (message) {
            message.style.display = 'block';
          }
        } else {
          this.message = 'Email address is not valid';
        }
      });
  }
}
