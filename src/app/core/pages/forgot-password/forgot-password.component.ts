import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    public authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [ '', [ 
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') 
      ]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.forgotPasswordForm.invalid) return;

    this.authService.forgotPassword(
      this.forgotPasswordForm.value.email
    );

    this.forgotPasswordForm.reset();
  }

}
