import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocService {

  constructor(private http: HttpClient) {}

  getAllDoctors() {
    const headers = new HttpHeaders({
      Authorization: `Bearer 125|tfeF5WypxyNzIdpylJrGjvhHOo5Op6xql2E0sfLhabde8fe0`
    });

    return this.http.get(environment.baseUrl + `/api/doctors`,{ headers }
    );
  }

  getDoctorById(id:number) :Observable<any> {
  return this.http.get(`${environment.baseUrl}/api/doctors/${id}`);
  }

getDoctorByName(name: string): Observable<any> {
  return this.http.get(
    `${environment.baseUrl}/api/doctors?name=${name}`
  );
}

}
