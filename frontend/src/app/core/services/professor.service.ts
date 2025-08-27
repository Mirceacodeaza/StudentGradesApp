import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private api = 'http://localhost:8080/api/professors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Professor[]> { return this.http.get<Professor[]>(this.api); }
  getById(id: number): Observable<Professor> { return this.http.get<Professor>(`${this.api}/${id}`); }
  create(dto: Professor): Observable<Professor> { return this.http.post<Professor>(this.api, dto); }
  update(id: number, dto: Professor): Observable<Professor> { return this.http.put<Professor>(`${this.api}/${id}`, dto); }
  remove(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
