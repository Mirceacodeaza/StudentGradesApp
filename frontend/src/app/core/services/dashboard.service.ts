import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CountsResponse {
  students: number;
  professors: number;
  courses: number;
}

export interface TopStudentDto {
  studentId: number;
  studentName: string;
  average: number;
}

export interface PopularCourseDto {
  courseId: number;
  courseName: string;
  gradesCount: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  counts(): Observable<CountsResponse> {
    return this.http.get<CountsResponse>(`${this.api}/counts`);
  }

  topStudents(size = 5): Observable<TopStudentDto[]> {
    const params = new HttpParams().set('size', size);
    return this.http.get<TopStudentDto[]>(`${this.api}/top-students`, { params });
  }

  popularCourses(size = 5): Observable<PopularCourseDto[]> {
    const params = new HttpParams().set('size', size);
    return this.http.get<PopularCourseDto[]>(`${this.api}/popular-courses`, { params });
  }
}
