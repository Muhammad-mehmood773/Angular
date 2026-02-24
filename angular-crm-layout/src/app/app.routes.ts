import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/layout/components/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: '/leads',
        pathMatch: 'full'
      },
      {
        path: 'leads',
        loadComponent: () => import('./features/leads/components/leads-table-simple.component').then(m => m.LeadsTableSimpleComponent)
      },
      {
        path: 'leads/add',
        loadComponent: () => import('./features/leads/components/add-lead.component').then(m => m.AddLeadComponent)
      }
    ]
  }
];
