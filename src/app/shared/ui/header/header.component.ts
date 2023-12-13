import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule } from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiDropdownModule,
    TuiLoaderModule,
    TuiTooltipModule,
} from '@taiga-ui/core';

import { AuthFacade } from '../../../auth/store/auth.facade';
import { MessageService } from '../../../core/services/message.service';
import { DebounceClickDirective } from '../../util/debounce-click.directive';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TuiButtonModule,
        TuiHintModule,
        TuiAvatarModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        TuiSvgModule,
        TuiDropdownModule,
        DebounceClickDirective,
        TuiLoaderModule,
        TuiTooltipModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    authUser$ = this.authFacade.user$;
    constructor(
        private authFacade: AuthFacade,
        private messageService: MessageService
    ) {}

    logout() {
        this.authFacade.logout();
    }

    toggleMessages() {
        this.messageService.toggleShowMessages();
    }
    ngOnInit() {
        this.messageService.clear();
    }
}
