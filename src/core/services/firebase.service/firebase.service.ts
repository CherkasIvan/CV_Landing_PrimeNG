import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  User,
  UserCredential,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IAuthCredentials } from '../../models/auth-credentials.interface';
import { IAuthResponse } from '../../models/auth-responce.interface';
import { IAuthState } from '../../models/auth-state.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private authStateSubject = new BehaviorSubject<IAuthState>({
    isAuthenticated: false,
    isAnonymous: true,
    email: null,
    uid: null,
  });

  private initAuthState(): void {
    authState(this.auth)
      .pipe(
        map((user) => this.mapUserToState(user)),
        tap((state) => {
          if (state.isAuthenticated) {
            localStorage.setItem('user', JSON.stringify(state));
          } else {
            localStorage.removeItem('user');
          }
        })
      )
      .subscribe((state) => {
        this.authStateSubject.next(state);
        if (state.isAuthenticated) {
          this.router.navigate(['/layout']);
        } else {
          this.router.navigate(['/auth']);
        }
      });
  }

  private mapUserToState(user: User | null): IAuthState {
    return {
      isAuthenticated: !!user,
      isAnonymous: user?.isAnonymous ?? true,
      email: user?.email ?? null,
      uid: user?.uid ?? null,
    };
  }

  private handleAuthOperation(
    operation: Promise<UserCredential>
  ): Observable<IAuthResponse> {
    return from(operation).pipe(
      map((credential) => ({
        user: credential.user,
        error: null,
      })),
      catchError((error) =>
        of({
          user: null,
          error: this.getErrorMessage(error.code),
        })
      )
    );
  }

  public authState$: Observable<IAuthState> =
    this.authStateSubject.asObservable();

  public constructor(private auth: Auth, private router: Router) {
    this.initAuthState();
  }

  public signUp(credentials: IAuthCredentials): Observable<IAuthResponse> {
    return this.handleAuthOperation(
      createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  public signIn(credentials: IAuthCredentials): Observable<IAuthResponse> {
    return this.handleAuthOperation(
      signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
    );
  }

  public signInAsGuest(): Observable<IAuthResponse> {
    return this.handleAuthOperation(signInAnonymously(this.auth));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.router.navigate(['/auth']))
    );
  }

  private getErrorMessage(code: string): string {
    const errors: Record<string, string> = {
      'auth/email-already-in-use': 'Этот email уже используется',
      'auth/user-not-found': 'Пользователь не найден',
      'auth/wrong-password': 'Неверный пароль',
      'auth/weak-password': 'Пароль слишком слабый',
      'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
      'auth/operation-not-allowed': 'Операция не разрешена',
    };

    return errors[code] || 'Произошла неизвестная ошибка';
  }
}
