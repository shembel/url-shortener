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
} from '@taiga-ui/core';
import { ApiModule } from './core/modules/openapi';

import { AppComponent } from './app/app.component';
import { ShortenerComponent } from './shared/ui/shortener/shortener.component';

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

        ApiModule,

        ShortenerComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
