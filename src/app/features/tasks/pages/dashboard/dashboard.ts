import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];

  totalTasks = 0;
  todoTasks = 0;
  inProgressTasks = 0;
  doneTasks = 0;

  recentTasks: Task[] = [];

  overdueTasks = 0;

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;

        this.totalTasks = tasks.length;

        this.todoTasks = tasks.filter((task) => task.status === 'todo').length;

        this.inProgressTasks = tasks.filter(
          (task) => task.status === 'in-progress',
        ).length;

        this.doneTasks = tasks.filter((task) => task.status === 'done').length;

        this.overdueTasks = tasks.filter(
          (task) =>
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== 'done',
        ).length;

        this.recentTasks = tasks.slice(0, 5);

        this.isLoading = false;
      },

      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
