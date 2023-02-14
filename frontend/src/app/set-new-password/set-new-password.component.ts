import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css'],
})
export class SetNewPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.userService.checkToken({ token: this.token }).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this.username = res['username'];
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  token = '';

  newPassword = '';
  confirmPassword = '';

  hideNewPassword = true;
  hideConfirmPassword = true;

  message = '';

  username = '';

  setPassword() {}
}
