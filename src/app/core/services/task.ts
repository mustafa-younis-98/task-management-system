import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }
}
