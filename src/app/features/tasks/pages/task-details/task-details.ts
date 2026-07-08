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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;

        console.log(task);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
