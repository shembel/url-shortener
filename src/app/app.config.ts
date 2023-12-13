import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { TuiRootModule, TUI_ANIMATIONS_DURATION } from '@taiga-ui/core';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';

import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services';
import { CoreModule } from './core/core.module';
import { ApiModule } from './core/modules/openapi';

const HttpClientInMemoryWebApiModuleStub =
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
        // simulating moderately slow network
        delay: 500,
    });

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        // ToDo: withFetch() is recommended for SSR but configuring SSL for CORS is time consuming
        // provideHttpClient(withFetch()),
        importProvidersFrom(
            RouterModule,
            TuiRootModule,
            HttpClientModule,
            HttpClientInMemoryWebApiModuleStub,
            CoreModule,
            ApiModule
        ),
        {
            provide: TUI_ANIMATIONS_DURATION,
            useFactory: () => (inject(TUI_IS_CYPRESS) ? 0 : 300),
        },
    ],
};
