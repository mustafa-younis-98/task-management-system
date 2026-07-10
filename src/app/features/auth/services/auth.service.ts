import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../../../environments/environment';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private http = inject(HttpClient);

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, request);
  }
}
