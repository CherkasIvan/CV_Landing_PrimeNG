import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.AuthComponent),
  },
  {
    path: 'layout',
    loadComponent: () => import('./layout/layout').then((m) => m.Layout),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
