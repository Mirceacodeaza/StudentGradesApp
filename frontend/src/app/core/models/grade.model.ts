export interface Grade {
  id?: number;
  value: number;      
  date: string;         
  studentId: number;
  courseId: number;
  
  studentName?: string;
  courseName?: string;
}
