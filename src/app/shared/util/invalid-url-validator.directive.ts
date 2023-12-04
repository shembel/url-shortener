import { Directive, Input } from '@angular/core';
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from '@angular/forms';

function isUrlValid(maybeUrl: string) {
    // This feature was added to the spec just recently, limited browser support
    const check = 'canParse' in URL;
    if (check) {
        // eslint-disable-next-line
        // @ts-ignore - canParse is not yet in the spec
        return URL.canParse(maybeUrl);
    }
    try {
        new URL(maybeUrl);
        return true;
    } catch (err) {
        return false;
    }
}

@Directive({
    selector: '[appInvalidUrlValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: InvalidUrlValidatorDirective,
            multi: true,
        },
    ],
    standalone: true,
})
export class InvalidUrlValidatorDirective implements Validator {
    @Input('appInvalidUrlValidator') invalidUrl = '';

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (value && !isUrlValid(value)) {
            return { invalidUrl: true };
        }

        return null;
    }
}
