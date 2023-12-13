import { Routes } from '@angular/router';
import { AuthGuardService, NoAuthGuardService } from './auth/guards';
import { MainComponent } from './features/main/main.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    {
        path: 'main',
        component: MainComponent,
    },
    {
        path: 'login',
        canActivate: [NoAuthGuardService()],
        loadComponent: () =>
            import('./auth/login/login.component').then(
                (m) => m.LoginComponent
            ),
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuardService()],
        loadComponent: () =>
            import('./features/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
    },
    {
        path: '404',
        component: MainComponent,
    },
    {
        path: '**',
        redirectTo: '/404',
    },
];
