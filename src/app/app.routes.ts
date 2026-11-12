import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'criar-agente',
    loadComponent: () => import('./features/criar-agente/criar-agente.component').then(m => m.CriarAgenteComponent)
  },
  {
    path: 'criar-especialista',
    loadComponent: () => import('./features/criar-especialista/criar-especialista.component').then(m => m.CriarEspecialistaComponent)
  },
  {
    path: 'chat/:agentId',
    loadComponent: () => import('./features/chat/chat.component').then(m => m.ChatComponent)
  }
];

