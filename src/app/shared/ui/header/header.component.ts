import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule } from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
} from '@taiga-ui/core';

import { AuthFacade } from '../../../auth/store/auth.facade';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TuiAvatarModule,
        TuiButtonModule,
        TuiHintModule,
        CommonModule,
        TuiAvatarModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        TuiSvgModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    authUser$ = this.authFacade.user$;

    constructor(private authFacade: AuthFacade) {}

    logout() {
        this.authFacade.logout();
    }
}
