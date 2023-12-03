import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiDialogModule,
    TuiNotificationModule,
    TuiRootModule,
} from '@taiga-ui/core';

import { ApiModule } from './core/modules/openapi';

import { AppComponent } from './app/app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        TuiRootModule,
        TuiDialogModule,
        TuiNotificationModule,

        ApiModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
