import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service/firebase.service';
import { IAuthState } from '../../models/auth-state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.firebaseService.authState$.pipe(
      map((state) => {
        const isAuthenticated = state.isAuthenticated;
        if (!isAuthenticated) {
          this.router.navigate(['/auth']);
        }
        return isAuthenticated;
      }),
      take(1)
    );
  }
}
