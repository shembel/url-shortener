import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService, NoAuthGuardService } from './auth/guards';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    {
        path: 'main',
        loadChildren: () =>
            import('./features/main/main.module').then((m) => m.MainModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./features/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [() => NoAuthGuardService()],
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        loadChildren: () =>
            import('./features/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
];
