import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private api = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> { return this.http.get<Student[]>(this.api); }
  getById(id: number): Observable<Student> { return this.http.get<Student>(`${this.api}/${id}`); }
  create(dto: Student): Observable<Student> { return this.http.post<Student>(this.api, dto); }
  update(id: number, dto: Student): Observable<Student> { return this.http.put<Student>(`${this.api}/${id}`, dto); }
  remove(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }

  
}
