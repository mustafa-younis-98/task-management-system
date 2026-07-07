import { Component, inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly taskService = inject(TaskService);

  constructor() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log(tasks);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
