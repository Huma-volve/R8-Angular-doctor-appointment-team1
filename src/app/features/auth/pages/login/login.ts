import { userLoginResponse } from './../../../../core/models/user';
import {FormGroup, FormControl, ReactiveFormsModule,Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { Auth } from './../../../../core/services/auth';
import { Component, inject } from '@angular/core';
import { FormHeader } from "../../components/form-header/form-header";
import { applyServerErrors } from '../../../../core/helpers/form.error';

@Component({
  selector: 'app-login',
  imports: [FormHeader,RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
authService = inject(Auth);

  loading:boolean  = false;
   serverErrors:string[] = [];
   resultMessage:string= '';
   router = inject(Router);
  loginForm = new FormGroup({
      phone:new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },
 
)

  // constructor(private authService:Auth) {}
  lgoinUser(){
    if(this.loginForm.valid){
        this.loading = true;
      console.log(this.loginForm.value);
      this.loading = true;
      this.authService.login(this.loginForm.value as userLoginResponse).subscribe({
         next:(res: any)=>{
            console.log(res);
            this.resultMessage = res.message; 
             this.authService.setToken(res.data?.token );
             this.router.navigate(['profile-details']);
             this.loginForm.reset(); 
             this.loading = false; 
         },
         error:(err:any)=>{
            this.loading = false;
            this.serverErrors =err.error?.errors;
            console.log(this.serverErrors);
            applyServerErrors(this.loginForm,err.error?.errors);
         }
      })
    }
  }
}
