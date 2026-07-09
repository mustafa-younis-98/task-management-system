import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmModalComponent } from '../../../../shared/components/delete-confirm-modal/delete-confirm-modal.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, FormsModule, DeleteConfirmModalComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly modalService = inject(NgbModal);
  private readonly toastService = inject(ToastService);

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
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  deleteTask(id: number | string) {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent, {
      centered: true,
    });

    modalRef.result
      .then((result) => {
        if (result !== true) {
          return;
        }

        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter((task) => task.id !== id);
            this.toastService.show('Task deleted successfully.', 'success');
          },
          error: () => {
            this.toastService.show('Something went wrong.', 'error');
          },
        });
      })
      .catch(() => {});
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
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
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong. Please try again.';
        },
      });
  }
}
