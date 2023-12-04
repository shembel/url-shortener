import { Component } from '@angular/core';
import {
    FormGroup,
    Validators,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    tuiInputPasswordOptionsProvider,
    TUI_PASSWORD_TEXTS,
    TuiInputModule,
} from '@taiga-ui/kit';

import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';

import { AuthFacade } from '../store/auth.facade';
import { of } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        CommonModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        TuiNotificationModule,
        TuiInputPasswordModule,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
    ],
    providers: [
        tuiInputPasswordOptionsProvider({
            icons: {
                hide: 'tuiIconUnlockLarge',
                show: 'tuiIconLockLarge',
            },
        }),
        {
            provide: TUI_PASSWORD_TEXTS,
            useValue: of(['']),
        },
    ],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    readonly loginForm = new FormGroup({
        username: new FormControl('', {
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            validators: [Validators.required],
        }),
    });

    isLoading$ = this.authFacade.isLoadingLogin$;
    showLoginError$ = this.authFacade.hasLoginError$;

    constructor(private authFacade: AuthFacade) {}

    submit() {
        const { username, password } = this.loginForm.value;
        this.authFacade.login(username as string, password as string);
    }
}
