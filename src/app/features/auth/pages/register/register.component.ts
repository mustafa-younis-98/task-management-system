import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  errorMessage = '';

  isLoading = false;

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^07\d{9}$/)]],
    gender: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request = this.registerForm.getRawValue() as RegisterRequest;

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.register(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        console.log(response);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;

        this.errorMessage =
          error.error?.message || 'Something went wrong. Please try again.';
      },
    });
  }
}
