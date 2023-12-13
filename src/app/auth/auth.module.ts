import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthService, authServiceInitProvider } from './auth.service';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { AUTH_FEATURE_KEY, authReducer } from './store/auth.reducer';

import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        LoginComponent,
        StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [AuthFacade, AuthService, authServiceInitProvider],
})
export class AuthModule {}
