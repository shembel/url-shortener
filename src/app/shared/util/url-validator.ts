import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(
    control: AbstractControl
): ValidationErrors | null {
    const value = control.value;

    try {
        new URL(value);
        return null;
    } catch (err) {
        return { invalidUrl: true };
    }
}

// type guard
export function urlIsString(url: string | null | undefined): url is string {
    return typeof url === 'string';
}
