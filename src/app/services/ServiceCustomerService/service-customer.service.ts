import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCustomerService {
  private baseUrl = `${environment['base-url']}/services`;

  constructor(private http: HttpClient) {}

  // Get all ServiceClients
  getAllServiceClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get a ServiceClient by ID
  getServiceClientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Add a new ServiceClient
  addServiceClient(serviceClient: any): Observable<any> {
    return this.http.post(this.baseUrl, serviceClient);
  }

  // Update an existing ServiceClient
  updateServiceClient(serviceClient: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, serviceClient);
  }

  // Delete a ServiceClient by ID
  deleteServiceClientById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get total ServiceClients count
  getTotalServiceClients(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
