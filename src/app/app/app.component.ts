// import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    // TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TUI_PARENT_ANIMATION } from '@taiga-ui/cdk';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [TUI_PARENT_ANIMATION],
    // providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
    title = 'url-shortener';
}
