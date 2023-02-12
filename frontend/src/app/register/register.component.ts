import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { checkImage } from '../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup.get('organizationName')?.disable();
    this.formGroup.get('organizationCountry')?.disable();
    this.formGroup.get('organizationCity')?.disable();
    this.formGroup.get('organizationZipCode')?.disable();
    this.formGroup.get('organizationStreet')?.disable();
    this.formGroup.get('organizationStreetNumber')?.disable();
    this.formGroup.get('organizationNumber')?.disable();
  }

  hidePassword = true;
  hideConfirmPassword = true;
  hide = true;

  message = '';

  imageValid = true;
  image: string | null = null;
  height = 200;
  width = 200;

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password == confirm ? null : { notMatched: true };
  }

  formGroup = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-z0-9_]{4,}$/),
      ]),
      password: new FormControl('', [
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.,?!@#$])[A-Za-z\d\.,?!@#$]+$/
        ),
      ]),
      confirmPassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9+-/ ]{9,17}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
        ),
      ]),
      organizer: new FormControl(false),
      organizationName: new FormControl(''),
      organizationCountry: new FormControl(''),
      organizationCity: new FormControl(''),
      organizationZipCode: new FormControl(''),
      organizationStreet: new FormControl(''),
      organizationStreetNumber: new FormControl(''),
      organizationNumber: new FormControl(''),
    },
    [this.passwordMatchValidator]
  );

  toggleOrganization() {
    if (this.formGroup.get('organizer')?.value) {
      this.formGroup.get('organizationName')?.enable();
      this.formGroup.get('organizationCountry')?.enable();
      this.formGroup.get('organizationCity')?.enable();
      this.formGroup.get('organizationZipCode')?.enable();
      this.formGroup.get('organizationStreet')?.enable();
      this.formGroup.get('organizationStreetNumber')?.enable();
      this.formGroup.get('organizationNumber')?.enable();
    } else {
      this.formGroup.get('organizationName')?.disable();
      this.formGroup.get('organizationCountry')?.disable();
      this.formGroup.get('organizationCity')?.disable();
      this.formGroup.get('organizationZipCode')?.disable();
      this.formGroup.get('organizationStreet')?.disable();
      this.formGroup.get('organizationStreetNumber')?.disable();
      this.formGroup.get('organizationNumber')?.disable();
      this.formGroup.get('organizationName')?.setValue(null);
      this.formGroup.get('organizationCountry')?.setValue(null);
      this.formGroup.get('organizationCity')?.setValue(null);
      this.formGroup.get('organizationZipCode')?.setValue(null);
      this.formGroup.get('organizationStreet')?.setValue(null);
      this.formGroup.get('organizationStreetNumber')?.setValue(null);
      this.formGroup.get('organizationNumber')?.setValue(null);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length == 0) {
      this.imageValid = true;
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
      this.image = reader.result as string;
    };
    reader.readAsDataURL(imageFile);
  }

  removeImage() {
    this.imageValid = true;
    this.image = null;
    this.message = '';
    this.height = 200;
    this.width = 200;
  }

  register() {
    const username = this.formGroup.get('username')?.value ?? '';

    if (!checkImage(this.height, this.width)) {
      this.message = 'Image size is not valid';
    } else if (this.formGroup.valid) {
      this.accountService
        .register({
          username: this.formGroup.get('username')?.value ?? '',
          password: this.formGroup.get('password')?.value ?? '',
          firstname: this.formGroup.get('firstname')?.value ?? '',
          lastname: this.formGroup.get('lastname')?.value ?? '',
          phone: this.formGroup.get('phone')?.value ?? '',
          email: this.formGroup.get('email')?.value ?? '',
          organizer: this.formGroup.get('organizer')?.value ?? false,
          organizationName:
            this.formGroup.get('organizationName')?.value ?? null,
          organizationCountry:
            this.formGroup.get('organizationCountry')?.value ?? null,
          organizationCity:
            this.formGroup.get('organizationCity')?.value ?? null,
          organizationZipCode:
            this.formGroup.get('organizationZipCode')?.value ?? null,
          organizationStreet:
            this.formGroup.get('organizationStreet')?.value ?? null,
          organizationStreetNumber:
            this.formGroup.get('organizationStreetNumber')?.value ?? null,
          organizationNumber:
            this.formGroup.get('organizationNumber')?.value ?? null,
          image: this.image,
        })
        .subscribe((res: any) => {
          if (res['status'] == 'ok') {
            this._snackBar.open(
              'Registration request successfully sent!',
              'Close'
            );
            this.router.navigate(['/']);
          } else {
            this.message = res['message'];
          }
        });
    }
  }
}
