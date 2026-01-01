import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from './../../core/services/auth';
import { userProfileReponse } from './../../core/models/user';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  avatarPreview: string | null = null;
  user: userProfileReponse | null = null;
  auth = inject(Auth);
  router = inject(Router);
  serverErrors:string[] = [];
    loading:boolean  = false;
   resultMessage:string= '';
  dayOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  monthNames: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
 

  ngOnInit(): void {
    this.getProfileData();
  }
  // get profile page
  getProfileData() {
    this.auth.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.data;
        console.log('User profile data:', res.data);
      },

      error: (err) => {
        console.error('Error fetching profile data:', err);
      },
    });
  }

  // edit profile
  editProfileUser(form: any) {
    const { day, month, year } = form.value;

    if (form.valid) {
      const updatedData = {
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email,
        address: form.value.address,
         birthDay:form.value.birthDay,
         birthMonth:form.value.birthMonth,
         birthYear:form.value.birthYear,

      };
      console.log(updatedData);
      // submit updated data to the server
      this.auth.editProfile(updatedData).subscribe({
        next: (res: any) => {
          console.log('Profile updated successfully:', res);
          this.resultMessage = res.message;
          this.getProfileData(); // Refresh profile data after update
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.serverErrors = err.error?.errors || [];
        },
      });
    }
  }

  // change password
  onChangePassword(form: any) {
    if (form.valid) {
      console.log(form.value);
      
      this.loading = true;
       this.auth.changePassword(form.value).subscribe({
          next: (res: any) => {
            console.log('Password changed successfully:', res);
            
            this.resultMessage = res.message;
            this.loading = false;
            form.reset();
          },error: (err) => {
            this.serverErrors =  err.error?.message || 'Error changing password';
            console.error('Error changing password:', err);
            this.loading = false;
          }
       });
      
    }
  }
  logout() {
    // Implement your logout logic here
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.auth.logout();
      this.router.navigate(['/login']); // Redirect to login page
    }
  }
}
