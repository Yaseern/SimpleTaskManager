import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../core/auth-store';
import { Task } from './task-type';
import { TaskStoreService } from './task-store';

@Injectable()
export class TaskService {

  private readonly baseUrl;

  constructor(private http: HttpClient, private auth: AuthService,
    private taskStoreService: TaskStoreService) {
    this.baseUrl = `${this.auth.baseDomain}api/tasks`
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: this.auth.getAuthHeader() });
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.baseUrl, { headers: this.getHeaders() })
      .pipe(tap((data) => this.taskStoreService.initiateStore(data)));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.baseUrl, task, { headers: this.getHeaders() })
      .pipe(tap((data) => this.taskStoreService.addStore(data)));
  }

  updateTask(task: Task): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/${task.id}`, task, { headers: this.getHeaders() })
      .pipe(tap(() => this.taskStoreService.updateStore(task)));
  }

  deleteTask(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(tap(() => this.taskStoreService.deleteStore(id)));
  }
}
