import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TUI_PARENT_ANIMATION } from '@taiga-ui/cdk';

import { HeaderComponent } from '../shared/ui/header/header.component';

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
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [TUI_PARENT_ANIMATION],
})
export class AppComponent {
    title = 'url-shortener';
}
