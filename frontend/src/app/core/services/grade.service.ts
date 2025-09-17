
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO-ul pe care îl returnează backend-ul (GradeDto) 
export interface GradeDto {
  id: number;
  value: number;
  date: string;          
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
}

// Payload pentru create/update (GradeRequest în backend) 
export interface GradeCreateUpdate {
  value: number;
  date: string;          
  studentId: number;
  courseId: number;
}

// Payload pentru filtrare /search (GradeFilterRequest în backend) 
export interface GradeFilterRequest {
  studentId?: number | null;
  courseId?: number | null;
  minValue?: number | null;
  maxValue?: number | null;
  fromDate?: string | null;  
  toDate?: string | null;    // 'YYYY-MM-DD'
}

@Injectable({ providedIn: 'root' })
export class GradeService {
  private api = 'http://localhost:8080/api/grades';

  constructor(private http: HttpClient) {}

  // CRUD & listări simple- sapt 4

  // Listă note
  getAll(studentId?: number): Observable<GradeDto[]> {
    let params = new HttpParams();
    if (studentId != null) {
      params = params.set('studentId', String(studentId));
    }
    return this.http.get<GradeDto[]>(this.api, { params });
  }

  getById(id: number): Observable<GradeDto> {
    return this.http.get<GradeDto>(`${this.api}/${id}`);
  }

  create(dto: GradeCreateUpdate): Observable<GradeDto> {
    return this.http.post<GradeDto>(this.api, dto);
  }

  update(id: number, dto: GradeCreateUpdate): Observable<GradeDto> {
    return this.http.put<GradeDto>(`${this.api}/${id}`, dto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Filtrare avansată-sapt 5
  search(filter: GradeFilterRequest): Observable<GradeDto[]> {
    return this.http.post<GradeDto[]>(`${this.api}/search`, filter);
  }
}
