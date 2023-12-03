import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiDialogModule,
    TuiNotificationModule,
    TuiRootModule,
} from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

import { ApiModule } from './core/modules/openapi';

@NgModule({
    // declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        TuiRootModule,
        TuiDialogModule,
        TuiNotificationModule,

        AppRoutingModule,

        ApiModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
