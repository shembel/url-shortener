import { Routes } from '@angular/router';
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
];
