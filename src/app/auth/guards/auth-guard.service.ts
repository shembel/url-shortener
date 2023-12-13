import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, take } from 'rxjs/operators';

import { selectIsLoggedIn } from '../store/auth.selectors';

export const AuthGuardService = (): CanActivateFn => {
    const guard: CanActivateFn = () => {
        const router = inject(Router);
        const store = inject(Store);

        return store.select(selectIsLoggedIn).pipe(
            take(1),
            tap((isLoggedIn) => {
                console.log('isLoggedIn', isLoggedIn);
                if (!isLoggedIn) {
                    router.navigate(['/login']);
                }
            })
        );
    };

    return guard;
};
