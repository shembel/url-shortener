import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import {
    TuiButtonModule,
    TuiNotificationModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiHostedDropdownComponent,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLoaderModule,
} from '@taiga-ui/core';
import {
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

import { AuthFacade } from '../../../auth/store/auth.facade';

import { InvalidUrlValidatorDirective } from '../../util/invalid-url-validator.directive';
import { UrlService } from '../../../core/services';
import { MessageService } from '../../../core/services/message.service';
import { Observable, Subscription } from 'rxjs';

import { DebounceClickDirective } from '../../util/debounce-click.directive';

function urlIsString(url: string | null | undefined): url is string {
    return typeof url === 'string';
}
@Component({
    standalone: true,
    selector: 'app-shortener-input',
    templateUrl: './shortener.component.html',
    styleUrls: ['./shortener.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,

        TuiInputModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiNotificationModule,
        TuiHostedDropdownModule,
        InvalidUrlValidatorDirective,
        TuiDataListWrapperModule,
        TuiDataListModule,
        TuiTooltipModule,
        TuiHintModule,
        TuiLoaderModule,

        DebounceClickDirective,
    ],
})

// ToDo: unsubscribe on onDestroy
export class ShortenerComponent {
    @ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;

    private subscriptions = {
        shortenUrl: Subscription,
        getAllUrls: Subscription,
        getUrlFromHash: Subscription,
    };

    // isLoading$ = this.urlService.isLoading$;
    // isLoading$ = this.urlService.isLoading;

    isLoading = this.urlService.isLoading;

    isLoggedIn$ = this.authFacade.isLoggedIn$;

    url: string = '';
    readonly options = ['Generate', 'Get by id', 'Get all'];
    readonly inputText: { [key: string]: string } = {
        Generate: 'Enter URL to shorten',
        'Get by id': 'Enter id to get URL',
        'Get all': 'Get all URLs',
    };

    shortenedUrl: string = '';
    longUrlFromHash: string = '';

    open = false;
    selected = this.options[0];

    constructor(
        private urlService: UrlService,
        private messageService: MessageService,
        private authFacade: AuthFacade
    ) {}

    onClickMenu(option: string) {
        this.open = !this.open;
        this.selected = option;
        console.log(this.selected);
        console.log(this.isLoggedIn$);
    }

    onClickAction(option: string, data?: string) {
        switch (option) {
            case 'Generate':
                this.submit();
                break;
            case 'Get by id':
                this.getUrlById(data as string);
                break;
            case 'Get all':
                this.getAllUrls();
                break;
        }
    }

    readonly urlShortenerForm = new FormGroup({
        url: new FormControl('', { validators: [Validators.required] }),
    });

    // isLoading$ =
    isInvalidUrl$ = false;

    customDisable() {
        if (this.selected === 'Get all' && !this.isLoggedIn$) {
            return true;
        }
        return false;
    }

    onCloseNotification() {
        this.isInvalidUrl$ = false;
    }

    getAllUrls(): void {
        this.urlService.getAllUrls().subscribe((urls) => console.log(urls));
    }

    getUrlById(id: string): void {
        if (!id) {
            this.messageService.add('No id provided.');
            this.url = '';
            return;
        }
        console.log('Getting url by id: ' + id);
        this.urlService.getUrlFromHash(id).subscribe((url) => console.log(url));
    }

    submit() {
        const { url } = this.urlShortenerForm.value;

        if (this.urlShortenerForm.invalid) {
            this.isInvalidUrl$ = this.urlShortenerForm.invalid;
            return;
        }

        this.isInvalidUrl$ = false;

        // type guard
        if (urlIsString(url)) {
            console.log('Generating short URL...');
            this.urlService.shortenUrl(url).subscribe(() => {
                this.urlShortenerForm.setValue({ url: '' });
            });
        }
    }
}
