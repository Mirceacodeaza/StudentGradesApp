import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private api = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> { return this.http.get<Course[]>(this.api); }
  getById(id: number): Observable<Course> { return this.http.get<Course>(`${this.api}/${id}`); }
  create(dto: Course): Observable<Course> { return this.http.post<Course>(this.api, dto); }
  update(id: number, dto: Course): Observable<Course> { return this.http.put<Course>(`${this.api}/${id}`, dto); }
  remove(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
