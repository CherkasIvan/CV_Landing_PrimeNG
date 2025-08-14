import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IAuthCredentials } from '../../core/models/auth-credentials.interface';
import { IAuthResponse } from '../../core/models/auth-responce.interface';
import { FirebaseService } from '../../core/services/firebase.service/firebase.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'cv-auth',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DividerModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;

    this.loading = true;
    this.error = null;

    const credentials: IAuthCredentials = this.authForm.value;
    const operation$ = this.isLoginMode
      ? this.firebaseService.signIn(credentials)
      : this.firebaseService.signUp(credentials);

    operation$.pipe(finalize(() => (this.loading = false))).subscribe({
      next: (response) => this.handleAuthResponse(response),
      error: (error) => (this.error = error),
    });
  }

  signInAsGuest(): void {
    this.loading = true;
    this.error = null;

    this.firebaseService
      .signInAsGuest()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => this.handleAuthResponse(response),
        error: (error) => (this.error = error),
      });
  }

  private handleAuthResponse(response: IAuthResponse): void {
    if (response.user) {
      this.router.navigate(['/layout']);
    } else if (response.error) {
      this.error = response.error;
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
}
