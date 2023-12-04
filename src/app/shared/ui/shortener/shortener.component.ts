import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
} from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

import { InvalidUrlValidatorDirective } from '../../util/invalid-url-validator.directive';
import { UrlService } from '../../../core/services/url.service';

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
        TuiInputModule,
        TuiSvgModule,
        TuiTextfieldControllerModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiNotificationModule,
        InvalidUrlValidatorDirective,
        CommonModule,
        TuiNotificationModule,
    ],
})
export class ShortenerComponent {
    @Input() url: string = '';

    constructor(private urlService: UrlService) {}

    // isLoading$ =
    // isInvalidUrl$ =

    readonly urlShortenerForm = new FormGroup({
        url: new FormControl('', {
            validators: [Validators.required, Validators.minLength(5)],
        }),
    });

    getAllUrls(): void {
        this.urlService.getAllUrls().subscribe((urls) => console.log(urls));
    }

    getUrlById(id: string): void {
        console.log('Getting url by id: ' + id);
        this.urlService.getUrlFromHash(id).subscribe((url) => console.log(url));
    }

    submit() {
        const { url } = this.urlShortenerForm.value;

        if (this.urlShortenerForm.invalid) {
            return;
        }

        // type guard
        if (urlIsString(url)) {
            console.log('Generating short URL...');
            this.urlService.shortenUrl(url).subscribe((value) => {
                console.log('got value: ');
                console.log(value);
            });
        }
    }
}
