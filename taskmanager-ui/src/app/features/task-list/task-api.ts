import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth-store';
import { Task } from './task-type';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'https://localhost:7178/api/tasks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: this.auth.getAuthHeader() });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, { headers: this.getHeaders() });
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${task.id}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
