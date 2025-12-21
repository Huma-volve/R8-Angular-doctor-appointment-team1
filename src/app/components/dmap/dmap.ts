import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocService } from '../dcard/service/doc-service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-dmap',
  imports: [CommonModule],
  templateUrl: './dmap.html',
  styleUrl: './dmap.scss',
})
export class Dmap implements OnInit {

  doctors: any[] = [];

constructor(private http: HttpClient,
    private docService: DocService){}
  ngOnInit(): void {
 this.docService.getAllDoctors().subscribe({
    next: (res: any) => {
      console.log('FULL RESPONSE:', res);
      this.doctors = res.data;
    },
    error: (err) => {
      console.error('API ERROR:', err);
    }
  });
  }
  

     getAllDoctors() {
    const headers = new HttpHeaders({
      Authorization: `Bearer 125|tfeF5WypxyNzIdpylJrGjvhHOo5Op6xql2E0sfLhabde8fe0`
    });

    return this.http.get(environment.baseUrl + `/api/doctors`,{ headers }
    );
  }

}
