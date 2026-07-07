import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly cdr = inject(ChangeDetectorRef);

  tasks: Task[] = [];

  searchTerm = '';

  selectedStatus: Task['status'] | '' = '';
  selectedPriority: Task['priority'] | '' = '';

  isLoading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.isLoading = true;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  deleteTask(id: number | string) {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (!isConfirmed) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong. Please try again.';
        },
      });

      return;
    }

    this.taskService.searchTasks(this.searchTerm).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }

  filterTasks(): void {
    this.taskService
      .searchTasks(this.searchTerm, this.selectedStatus, this.selectedPriority)
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong. Please try again.';
        },
      });
  }
}
