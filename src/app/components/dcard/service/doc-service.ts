import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocService {

  constructor(private http: HttpClient) { }

  getAllDoctors() {
    return this.http.get(environment.baseUrl + `/api/doctors`,
    );
  }

  getDoctorsAv(id: number) : Observable<any> {
    return this.http.get(environment.baseUrl + `/api/doctors/${id}/availability`,
    );
  }
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/doctors/${id}`);
  }

  getDoctorByName(name: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/api/doctors?name=${name}`
    );
  }


}
