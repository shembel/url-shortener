import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AuthModule } from '../auth/auth.module';
import { authInterceptorProviders } from '../auth/interceptors';
import { MockAuthApiService } from './mock-data';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,

        HttpClientInMemoryWebApiModule.forRoot(MockAuthApiService),

        StoreModule.forRoot({}, {}),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),

        AuthModule,
    ],
    providers: [...authInterceptorProviders],
})
export class CoreModule {
    // singleton guard
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule can be loaded only once.');
        }
    }
}
