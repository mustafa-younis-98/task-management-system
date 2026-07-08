import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);

  private readonly taskService = inject(TaskService);

  task?: Task;

  isLoading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.isLoading = true;

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;

        this.isLoading = false;

        console.log(task);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
