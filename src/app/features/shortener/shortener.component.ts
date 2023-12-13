import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    Inject,
} from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';

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
    TuiAlertService,
} from '@taiga-ui/core';
import {
    TuiActionModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiTilesModule,
} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

import { AuthFacade } from '../../auth/store/auth.facade';

import { UrlService } from '../../core/services';
import { MessageService, WindowService } from '../../core/services';

import { DebounceClickDirective } from '../../shared/util/debounce-click.directive';
import { urlValidator, urlIsString } from '../../shared/util/url-validator';
import { UrlItem } from '../../core/modules/openapi';
import { Subject, takeUntil } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-shortener-input',
    templateUrl: './shortener.component.html',
    styleUrls: ['./shortener.component.scss'],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ClipboardModule,

        TuiInputModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiNotificationModule,
        TuiHostedDropdownModule,
        TuiDataListWrapperModule,
        TuiDataListModule,
        TuiTooltipModule,
        TuiHintModule,
        TuiLoaderModule,
        TuiIslandModule,
        TuiActionModule,
        TuiTilesModule,

        DebounceClickDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

// ToDo: unsubscribe on onDestroy
export class ShortenerComponent {
    @ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;

    // private > public for testing purposes
    public destroy$ = new Subject<void>();

    public shortURL: UrlItem['shortUrl'] = '';

    isInvalidUrl$ = false;
    isInvalidUUID$ = false;

    isLoading!: boolean;
    isLoading$ = this.urlService.isLoading$;

    public isLoggedIn$ = this.authFacade.isLoggedIn$;

    url: string = '';
    readonly actions = ['Generate', 'Get by id', 'Get all'];
    readonly inputText: { [key: string]: string } = {
        Generate: 'Enter URL to shorten',
        'Get by id': 'Enter id to get URL',
        'Get all': 'Get all URLs',
    };

    open = false;
    selected = this.actions[0];

    constructor(
        private urlService: UrlService,
        private messageService: MessageService,
        private authFacade: AuthFacade,
        @Inject(TuiAlertService)
        public readonly alerts: TuiAlertService,
        public windowService: WindowService
    ) {}

    onClickMenu(action: string) {
        this.open = !this.open;
        this.selected = action;
        console.log(this.selected);
        console.log(this.isLoggedIn$);
    }

    onClickAction(action: string, event: Event, data?: string) {
        this.submit(action, data);
        event.preventDefault();
    }

    onClickCopy(shortURL: string) {
        this.shortURL = '';
        this.alerts.open(shortURL).subscribe();
    }

    readonly urlShortenerForm = new FormGroup({
        url: new FormControl('', {
            validators: [Validators.required, urlValidator],
        }),
    });

    onCloseNotification() {
        this.isInvalidUrl$ = false;
        this.isInvalidUUID$ = false;
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
        this.urlService.getUrlFromHash(id).subscribe((urlItem) => {
            this.isInvalidUUID$ = urlItem === undefined;
            this.shortURL = urlItem?.shortUrl ?? '';
        });
    }

    openUrl(shortUrl: string): void {
        if (!shortUrl) {
            this.messageService.add('No url provided.');
            return;
        }
        this.windowService.openUrl(shortUrl);
    }

    shortenUrl(): void {
        const { url } = this.urlShortenerForm.value;

        if (this.urlShortenerForm.invalid) {
            this.isInvalidUrl$ = true;
            return;
        }

        this.isInvalidUrl$ = false;

        if (urlIsString(url)) {
            this.urlService.shortenUrl(url).subscribe((urlItem) => {
                this.shortURL = urlItem.shortUrl;
                this.urlShortenerForm.setValue({ url: '' });
            });
        }
    }

    submit(action: string, data?: string) {
        switch (action) {
            case 'Generate':
                this.shortenUrl();
                break;
            case 'Get by id':
                this.getUrlById(data as string);
                break;
            case 'Get all':
                this.getAllUrls();
                break;
        }
    }

    ngOnInit(): void {
        this.urlService.isLoading$
            .pipe(takeUntil(this.destroy$))
            .subscribe((isLoading) => {
                this.isLoading = isLoading;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
