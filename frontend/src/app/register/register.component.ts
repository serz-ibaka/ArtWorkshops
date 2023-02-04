import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

  ngOnInit(): void {}

  hidePassword = true;
  hideConfirmPassword = true;
  hide = true;

  usernames: string[] = [];

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
      organizationAddress: new FormControl(''),
      organizationNumber: new FormControl(''),
    },
    [this.passwordMatchValidator]
  );

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notMatched: true };
  }

  toggleOrganization() {
    if (this.formGroup.get('organizer')?.value) {
      document.getElementById('organization-name')!!.style.display = 'block';
      document.getElementById('organization-address')!!.style.display = 'block';
      document.getElementById('organization-number')!!.style.display = 'block';
    } else {
      document.getElementById('organization-name')!!.style.display = 'none';
      document.getElementById('organization-address')!!.style.display = 'none';
      document.getElementById('organization-number')!!.style.display = 'none';
      this.formGroup.get('organizationName')?.setValue(null);
      this.formGroup.get('organizationAddress')?.setValue(null);
      this.formGroup.get('organizationNumber')?.setValue(null);
    }
  }

  onFileSelected(event: any) {}

  register() {
    if (this.formGroup.valid) {
      this._snackBar.open('Registration request successfully sent!', 'Close');
      this.router.navigate(['/']);
    }
  }
}
