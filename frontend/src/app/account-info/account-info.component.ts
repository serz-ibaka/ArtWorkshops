import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { checkImage } from '../validators';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.type = localStorage.getItem('type') ?? '';
    if (this.type != 'participant' && this.type != 'organizer') {
      this.router.navigate(['/']);
    }
    this.userService
      .getUser(localStorage.getItem('username') ?? '')
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this.user = res['user'];
          this.image = res['image'].content;
        }
      });
  }

  type = '';
  user: any = null;
  image: string = '';

  infoMessage = '';

  oldPassword = '';
  hideOldPassword = true;
  newPassword = '';
  hideNewPassword = true;
  confirmPassword = '';
  hideConfirmPassword = true;
  passwordMessage = '';

  newImage = '';
  height = 0;
  width = 0;
  imageMessage = '';

  onFileSelected(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        this.height = image.height;
        this.width = image.width;
      };
      image.src = event.target.result as string;
      image.src = reader.result as string;
      this.newImage = reader.result as string;
    };
    reader.readAsDataURL(imageFile);
  }

  changeInfo() {
    this.userService.updateUser(this.user).subscribe((res: any) => {
      if (this.user.firstname == '') {
        this.infoMessage = 'Firstname is required';
      } else if (this.user.lastname == '') {
        this.infoMessage = 'Lastname is required';
      } else if (!/^[0-9+-/ ]{9,17}$/.test(this.user.phone)) {
        this.infoMessage = 'Phone is not in valid format';
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(
          this.user.email
        )
      ) {
        this.infoMessage = 'Email is not in valid format';
      } else {
        if (res['status'] == 'ok') {
          this._snackBar.open('Information successfully updated', 'Close');
        }
      }
    });
  }

  changePassword() {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.,?!@#$])[A-Za-z\d\.,?!@#$]+$/.test(
        this.newPassword
      )
    ) {
      this.passwordMessage = 'New password is not in valid format';
    } else if (this.newPassword != this.confirmPassword) {
      this.passwordMessage = 'Passwords do not match';
    } else {
      this.userService
        .updatePassword({
          username: this.user.username,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .subscribe((res: any) => {
          if (res['status'] == 'error') {
            this.passwordMessage = res['message'];
          } else {
            this._snackBar.open('Password successfully changed', 'Close');
            this.router.navigate(['/logout']);
          }
        });
    }
  }

  changeImage() {
    if (checkImage(this.height, this.width)) {
      this.image = this.newImage;
      (document.getElementById('new-image') as HTMLInputElement).value = '';
      this.userService
        .updateImage({
          username: this.user.username,
          image: this.newImage,
        })
        .subscribe((res: any) => {
          if (res['status'] == 'ok') {
            this._snackBar.open('Image successfully changed', 'Close');
          }
        });
    } else {
      this.imageMessage = 'Image is not in valid format';
    }
  }
}
