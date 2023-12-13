import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {
    TuiRootModule,
    TuiNightThemeService,
    TuiThemeNightModule,
} from '@taiga-ui/core';

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
        TuiThemeNightModule,

        HeaderComponent,
        MessagesComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [TUI_PARENT_ANIMATION],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'url-shortener';
    urls: Url[] = [];

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
