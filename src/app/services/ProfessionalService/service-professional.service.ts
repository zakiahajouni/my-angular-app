import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfessionalService {
  private baseUrl = `${environment['base-url']}/professionnels`;

  constructor(private http: HttpClient) {}

  // Get all Professionals
  getAllProfessionnels(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a Professional by ID
  getProfessionnelById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Add a new Professional
  addProfessionnel(professionnel: any): Observable<any> {
    return this.http.post(this.baseUrl, professionnel);
  }

  // Update an existing Professional
  updateProfessionnel(professionnel: any): Observable<any> {
    return this.http.put(this.baseUrl, professionnel);
  }


  // Delete a Professional by ID
  deleteProfessionnelById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get total count of Professionals
  getTotalProfessionnels(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
