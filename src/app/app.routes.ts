import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  },

  // ==========================
  // Auth Layout
  // ==========================
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
    ],
  },

  // ==========================
  // Main Layout
  // ==========================
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

  // ==========================
  // Error Layout
  // ==========================
  {
    path: '',
    loadComponent: () =>
      import('./layouts/error-layout/error-layout.component').then(
        (m) => m.ErrorLayoutComponent,
      ),
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./shared/pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
      },
    ],
  },
];
