import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  passTextType: boolean = false;

  closeResult!: string;

  togglePassTextType() {
    this.passTextType = !this.passTextType;
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
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
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

    this.loginForm.reset();
  }

  // deleteUserAccount() {
  //   this.authService.deleteAccount()
  // }

}
