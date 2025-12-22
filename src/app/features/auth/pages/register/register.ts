import { User } from './../../../../core/models/user';
import { Auth } from './../../../../core/services/auth';
import { Component, inject } from '@angular/core';
import { RouterLink,Router } from "@angular/router";

import { FormHeader } from "../../components/form-header/form-header";
import {FormGroup, FormControl, ReactiveFormsModule,Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { applyServerErrors } from '../../../../core/helpers/form.error';
import { GoogleLogin } from "../../components/google-login/google-login";
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormHeader, ReactiveFormsModule, GoogleLogin],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
 
  authService = inject(Auth);

  loading:boolean  = false;
   serverErrors:string[] = [];
   resultMessage:string= '';
   router = inject(Router);
  registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone:new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required]),
  },
   {validators: this.passwordConfirmMatch}
)

   passwordConfirmMatch(
  control: AbstractControl
): ValidationErrors | null {

  const password = control.get('password')?.value;
  const confirm = control.get('password_confirmation')?.value;

  if (!password || !confirm) return null;

  return password === confirm
    ? null
    : { passwordMismatch: true };
}
 
  // constructor(private authService:Auth) {}
  registerUser(){
    if(this.registerForm.valid){
        this.loading = true;
      console.log(this.registerForm.value);
      this.loading = true;
      this.authService.register(this.registerForm.value as User).subscribe({
         next:(res: any)=>{
          
            console.log(res);
            this.resultMessage = res.message;
             localStorage.setItem('user_phone', this.registerForm.value.phone || '');
             this.router.navigate(['/otp']);
             this.registerForm.reset();
             alert('Registered successfully, please verify your email');
             this.loading = false;

         },
         
         error:(err:any)=>{
            this.loading = false;
           
            this.serverErrors =err.error?.errors;
             
            console.log(this.serverErrors);
            applyServerErrors(this.registerForm,err.error?.errors);
            
         }
      })
    }
  }




  
  
}
