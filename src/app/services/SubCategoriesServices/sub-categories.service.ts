import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubCategoriesService {
  private baseUrl = `${environment['base-url']}/sousCategories`;

  constructor(private http: HttpClient) {}

  getAllSubCtegories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSubCtegorieById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addSubCtegorie(categorie: any): Observable<any> {
    return this.http.post(this.baseUrl, categorie);
  }

  updateSubCtegorie(categorie: any): Observable<any> {
    return this.http.put(this.baseUrl, categorie);
  }

  deleteSubCtegorieById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalSubCtegories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
