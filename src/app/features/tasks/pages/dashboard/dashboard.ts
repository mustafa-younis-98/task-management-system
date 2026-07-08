import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
