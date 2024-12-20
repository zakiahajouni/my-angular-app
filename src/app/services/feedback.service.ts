import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = `${environment['base-url']}/feedbacks`;

  constructor(private http: HttpClient) {}

  // Add a new feedback
  addFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, feedback);
  }

  // Get feedbacks by Service ID
  getFeedbacksByServiceId(serviceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/service/${serviceId}`);
  }

  // Get the average note by Service ID
  getAverageNoteByServiceId(serviceId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average/${serviceId}`);
  }

  // Get all feedbacks
  getAllFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get total feedbacks by Service ID
  getTotalFeedbacksByServiceId(serviceId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total/${serviceId}`);
  }

  // Delete a feedback by ID
  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${feedbackId}`);
  }
}
