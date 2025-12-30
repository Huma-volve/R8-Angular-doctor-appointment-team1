import { Router } from '@angular/router';
import { AuthService } from './../../../../core/services/auth';
import { Component, inject ,OnInit} from '@angular/core';
import { FormHeader } from "../../components/form-header/form-header";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-otp',
  imports: [FormHeader,FormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.scss',
})
export class Otp {
    auth = inject(AuthService);
    fromPage!: string;
    router = inject(Router);
    statusMessage:string = ' ';
    loading:boolean = false;
    isCorrectOtp:boolean = true;
    otp1='';
    otp2 ='';
    otp3='';
    otp4='';

     constructor()
     {
        this.fromPage = history.state.from;

     }
    ngOnInit()
    {
      this.startTime();
    }
   isOtpComplete() : boolean {
    return  this.otp1 !== '' && this.otp2 !== '' && this.otp3 !== '' && this.otp4 !== '';
   }
   timer:number = 60;

   startTime()
   {
    setInterval(() => { 

      this.timer--;
      if(this.timer ===0)
      {
        this.timer =60;
      }
    }, 1000);
   }
  verifyOtp(){
    const phone = localStorage.getItem('user_phone') || '';
    const otpCode = [this.otp1, this.otp2, this.otp3, this.otp4].join('');
    const payload = {
      phone: phone,
      otp: otpCode
    };
    console.log('Verifying OTP with payload:', payload);
    // Here you can call the Auth service to verify the OTP
    this.loading = true;
     this.auth.verifyOtp(payload).subscribe({
         next:(res:any)=>{
            console.log('OTP verified successfully:', res);
            alert('OTP verified successfully!');
            this.loading = false;
            this.isCorrectOtp = true;
            if(this.fromPage === 'editProfile')
            {
              this.router.navigate(['/forgetPassword']);
            }else{
            this.router.navigate(['/login']);
            }
            
         },error:(err)=>{
            console.error('Error verifying OTP:', err);
            // alert('Failed to verify OTP. Please try again.');
            this.statusMessage = err.error?.message;
            this.loading = false;
            this.isCorrectOtp = false;
         }
     });

    
  }

  resendOtp(){
     this.loading = true;
     this.auth.resendOtp({}).subscribe({
         
     });
  }
   
}
