import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiDialogModule,
    TuiNotificationModule,
    TuiRootModule,
    TuiSvgModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiButtonModule,
} from '@taiga-ui/core';
import { ApiModule } from './core/modules/openapi';

import { AppComponent } from './app/app.component';
import { ShortenerComponent } from './shared/ui/shortener/shortener.component';
import { TuiFieldErrorPipeModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { CoreModule } from './core/core.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        TuiRootModule,
        TuiDialogModule,
        TuiNotificationModule,
        TuiSvgModule,
        TuiThemeNightModule,
        TuiModeModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        TuiNotificationModule,
        TuiInputPasswordModule,

        ApiModule,

        CoreModule,

        ShortenerComponent,
    ],
    providers: [CoreModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
