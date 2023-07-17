import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './validators/username.validator';
import { PasswordValidator } from './validators/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public registrationForm!: FormGroup;

  get getUsername() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  removeAlternateEmail(index: number) {
    this.alternateEmails.removeAt(index);
  }

  constructor(private fb: FormBuilder) {}

  // public registrationForm = new FormGroup({
  //   username: new FormControl('Sarzeez'),
  //   password: new FormControl('123'),
  //   confirmPassword: new FormControl('123'),
  //   address: new FormGroup({
  //     state: new FormControl('Uzbekistan'),
  //     city: new FormControl('Ferghana'),
  //   }),
  // });

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: [
          'Sarzeez',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/admin/),
          ],
        ],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          state: [''],
          city: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: [PasswordValidator] }
    );

    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }

  onLoadData() {
    this.registrationForm.patchValue({
      username: 'sarzeez',
      password: '12345',
      confirmPassword: '12345',
      address: {
        state: 'Uzbekistan',
        city: 'Tashkent',
      },
    });
  }
}
