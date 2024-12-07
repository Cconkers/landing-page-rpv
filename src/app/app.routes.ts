import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth.routes').then(m => m.authRoutes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./auth.routes').then(m => m.authRoutes),
  },
];
