import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MessageService } from '../../core/services/message.service';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, TuiButtonModule],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
    showMessages$ = this.messageService.showMessages$;
    constructor(public messageService: MessageService) {}
}
