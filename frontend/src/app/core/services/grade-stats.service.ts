import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvgResponse { id: number; average: number; }
export interface PassRateResponse { courseId: number; passRate: number; passed: number; total: number; }

@Injectable({ providedIn: 'root' })
export class GradeStatsService {
  private api = 'http://localhost:8080/api/grades/stats';

  constructor(private http: HttpClient) {}

  // media pe student
  averageByStudent(studentId: number): Observable<AvgResponse> {
    return this.http.get<AvgResponse>(`${this.api}/student/${studentId}/average`);
  }

  // media pe curs (dacă ai implementat-o)
  averageByCourse(courseId: number): Observable<AvgResponse> {
    return this.http.get<AvgResponse>(`${this.api}/course/${courseId}/average`);
  }

  // promovabilitate pe curs
  passRateByCourse(courseId: number): Observable<PassRateResponse> {
    return this.http.get<PassRateResponse>(`${this.api}/course/${courseId}/pass-rate`);
  }
}
