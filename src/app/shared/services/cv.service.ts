import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CV } from '../models/cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private apiUrl = 'http://localhost:37138/api/cv/';

  constructor(private http: HttpClient) {}

  
  // Get all CVs
  getCvs(): Observable<CV[]> {
    return this.http.get<CV[]>(`${this.apiUrl}GetAllCVs`);
  }

  // Get cv by ID
  getCv(id: number): Observable<CV> {
    return this.http.get<CV>(`${this.apiUrl}GetCVById/${id}`);
  }

  // Create CV
  createCv(cv: CV): Observable<CV> {
    return this.http.post<CV>(`${this.apiUrl}CreateCV`, cv);
  }

  // Update CV
  updateCv(id: number, cv: CV): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}UpdateCV/${id}`, cv);
  }

  // Delete CV by ID
  deleteCv(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}DeleteCV/${id}`);
  }
}
