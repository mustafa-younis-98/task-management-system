import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(id: number | string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchTasks(
    search: string,
    status: string = '',
    priority: string = '',
  ): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.apiUrl}?search=${search}&status=${status}&priority=${priority}`,
    );
  }

  addTask(
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTaskById(id: number | string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(
    id: number | string,
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
}
