import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../../core/services/auth';
import { Component, inject } from '@angular/core';
import { FormHeader } from "../../components/form-header/form-header";

@Component({
  selector: 'app-edit-phone',
  imports: [FormHeader,FormsModule],
  templateUrl: './edit-phone.html',
  styleUrl: './edit-phone.scss',
})
export class EditPhone {


  auth = inject(AuthService);
  router = inject(Router);
    loading:boolean  = false;
   resultMessage:string= '';
  // edit profile
  phone = '';
  submit(form: any) {
   
    if (form.valid) {
      this.loading = true;
      console.log(form.value);
      // submit updated data to the server
      this.auth.forgetPassword(form.value).subscribe({
        next: (res: any) => {
          console.log('Profile updated successfully:', res);
          this.resultMessage = res.message;
      this.loading = false;
    
       this.router.navigate(['/otp'], {
  state: { from: 'editPhone' }
});
       
        },
        error: (err:any) => {
          console.error('Error updating profile:', err);
          this.resultMessage = err?.errors;
          console.log(this.resultMessage);
          
      this.loading = false;

        },
      });
    }
  }

  // change password
  
}
