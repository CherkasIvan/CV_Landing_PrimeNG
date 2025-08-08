import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { IAuthState } from '../../models/auth-state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);

  public canActivate(): Observable<boolean> {
    return this.firebaseService.authState$.pipe(
      map((state: IAuthState) => {
        if (state.isAuthenticated) {
          return true;
        }

        this.router.navigate(['/auth']);
        return false;
      })
    );
  }
}
