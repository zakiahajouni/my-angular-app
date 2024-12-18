import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private baseUrl = `${environment['base-url']}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCategorieById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post(this.baseUrl, categorie);
  }

  updateCategorie(categorie: any): Observable<any> {
    return this.http.put(this.baseUrl, categorie);
  }

  deleteCategorieById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTotalCategories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
