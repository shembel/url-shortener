import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '../../auth/store/auth.facade';
import { USERS } from '../../core/mock-data';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiNotificationModule } from '@taiga-ui/core';
import { LetDirective } from '@ngrx/component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        TuiBadgeModule,
        TuiNotificationModule,
        LetDirective,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    user$ = this.authFacade.user$;
    users = USERS;

    constructor(private authFacade: AuthFacade) {}
}
