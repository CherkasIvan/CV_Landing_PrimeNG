import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { ERoute } from '../utils/constants/route.enum';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then((m) => m.AuthComponent),
  },
  {
    path: ERoute.LAYOUT,
    component: Layout,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.routes').then((c) => c.LAYOUT_ROUTES),
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
