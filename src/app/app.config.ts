import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import {
    TuiRootModule,
    TUI_SANITIZER,
    TUI_ANIMATIONS_DURATION,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_IS_CYPRESS } from '@taiga-ui/cdk';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
        importProvidersFrom(TuiRootModule),
        {
            provide: TUI_ANIMATIONS_DURATION,
            useFactory: () => (inject(TUI_IS_CYPRESS) ? 0 : 300),
        },
    ],
};
