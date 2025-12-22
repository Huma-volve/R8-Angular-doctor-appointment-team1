import { Api } from './../../../../core/services/api';
import { HttpClient } from '@angular/common/http';
import { Component, inject,OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-google-login',
  imports: [],
  templateUrl: './google-login.html',
  styleUrl: './google-login.scss',
})
export class GoogleLogin {
  http = inject(HttpClient);
  api = inject(Api);
  GOOGLE_CLIENT_ID     = '80775955360-493bcovp441v7djo0cto3b05jh52noci.apps.googleusercontent.com';

   ngOnInit()
   {
    google.accounts.id.initialize({
      client_id: this.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleCredential(response)
    });

     google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large' }
    );
     this.loginWithGoogle();
   }
   loginWithGoogle() {
  google.accounts.id.prompt();
}

   handleCredential(res:any)
   {
        const id_token = res.credential
        console.log(id_token);
        
        this.http.post(`${this.api.API_URL}/auth/google-register`,{id_token}).subscribe(res=>{
          console.log('login sucess',res);
          
        })
   }

}
