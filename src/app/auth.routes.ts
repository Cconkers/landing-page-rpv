import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/features/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/features/sign-up/sign-up.component').then(m => m.SignUpComponent)
  }
] as Routes;
