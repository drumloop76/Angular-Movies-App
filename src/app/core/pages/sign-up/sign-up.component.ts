import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  signUpForm: FormGroup;
  submitted = false;
  passTextType: boolean = false;

  togglePassTextType() {
    this.passTextType = !this.passTextType;
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      firstName: [ '', [ 
        Validators.required
      ]],
      lastName: [ '', [ 
        Validators.required
      ]],
      email: [ '', [ 
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') 
      ]],
      password: [ '', [ 
        Validators.required, 
        Validators.pattern('[A-Za-zd$@$!%*?&].{8,}') 
      ]],
    })
  }

  get f() {
    return this.signUpForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;

    if(this.signUpForm.invalid) return

    this.authService.signUp(
      this.signUpForm.value.firstName, 
      this.signUpForm.value.lastName, 
      this.signUpForm.value.email, 
      this.signUpForm.value.password
    );

    this.signUpForm.reset();
  }
}
