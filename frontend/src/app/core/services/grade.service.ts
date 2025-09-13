import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';

@Injectable({ providedIn: 'root' })
export class GradeService {
  private api = 'http://localhost:8080/api/grades';

  constructor(private http: HttpClient) {}

  getAll(studentId?: number): Observable<Grade[]> {
    let params = new HttpParams();
    if (studentId) params = params.set('studentId', studentId);
    return this.http.get<Grade[]>(this.api, { params });
  }

  getById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.api}/${id}`);
  }

  create(dto: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.api, dto);
  }

  update(id: number, dto: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.api}/${id}`, dto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
