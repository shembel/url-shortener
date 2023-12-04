import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiNightThemeService,
    TuiThemeNightModule,
    TuiModeModule,
} from '@taiga-ui/core';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TUI_PARENT_ANIMATION } from '@taiga-ui/cdk';

import { HeaderComponent } from '../shared/ui/header/header.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { Url } from '../core/modules/openapi';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        RouterModule,
        HeaderComponent,
        TuiThemeNightModule,
        TuiModeModule,
        MessagesComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [TUI_PARENT_ANIMATION],
})
export class AppComponent implements OnInit {
    title = 'url-shortener';
    urls: Url[] = [];

    ngOnInit(): void {
        return;
        // this.getUrls();
    }

    constructor(
        @Inject(TuiNightThemeService) readonly night: TuiNightThemeService
    ) {}

    get mode(): 'onDark' | null {
        if (this.night === null) {
            return null;
        }
        return 'onDark';
    }
}
