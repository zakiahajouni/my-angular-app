import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from 'src/app/models/Demande';

@Injectable({
  providedIn: 'root',
})
export class ServiceDemandesService {
  private baseUrl = `${environment['base-url']}/demandes`;

  constructor(private http: HttpClient) {}

  // Get all demandes
  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}`);
  }

  // Get a demande by ID
  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.baseUrl}/${id}`);
  }
// Add a new demande
addDemande(demande: Demande): Observable<any> {
  return this.http.post(`${this.baseUrl}`, demande, { responseType: 'text' });
}


  // Update an existing demande
  updateDemande(demande: Demande): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`, demande);
  }

  // Delete a demande by ID
  deleteDemandeById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Accept a demande
  accepterDemande(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/accepter`, {});
  }

  // Refuse a demande
  refuserDemande(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/refuser`, {});
  }

  // Cancel a demande
  annulerDemande(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/annuler`, {});
  }
  getStatusDistribution(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/status-distribution`);
  }
  getTopServices(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/top-services`);
  }

}
