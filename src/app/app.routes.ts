import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/tasks/pages/dashboard/dashboard').then(
            (m) => m.Dashboard,
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks/pages/task-list/task-list').then(
            (m) => m.TaskList,
          ),
      },
      {
        path: 'tasks/add',
        loadComponent: () =>
          import('./features/tasks/pages/add-task/add-task').then(
            (m) => m.AddTask,
          ),
      },
      {
        path: 'tasks/:id',
        loadComponent: () =>
          import('./features/tasks/pages/task-details/task-details').then(
            (m) => m.TaskDetails,
          ),
      },
      {
        path: 'tasks/:id/edit',
        loadComponent: () =>
          import('./features/tasks/pages/edit-task/edit-task').then(
            (m) => m.EditTask,
          ),
      },
    ],
  },
];
