import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'loggin',
    loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'registration',
    loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  }
] as Routes;
