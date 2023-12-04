import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';
import {
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { AuthService, authServiceInitProvider } from './auth.service';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { AUTH_FEATURE_KEY, authReducer } from './store/auth.reducer';

import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuardService } from './guards';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuardService()],
    },
];

@NgModule({
    imports: [
        LoginComponent,
        CommonModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiNotificationModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [AuthFacade, AuthService, authServiceInitProvider],
})
export class AuthModule {}
