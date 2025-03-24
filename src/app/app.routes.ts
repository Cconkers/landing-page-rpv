import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth.routes').then(m => m.authRoutes),
  },
  {
    path: '**',
    redirectTo: 'auth/sign-in',
  },
];
