import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  toastService.show('Please log in to continue.', 'error');

  router.navigate(['/login']);

  return false;
};
