import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { selectIsLoggedIn } from '../store/auth.selectors';

export const NoAuthGuardService = (): CanActivateFn => {
    const guard: CanActivateFn = () => {
        const router = inject(Router);
        const store = inject(Store);

        const hasAccess = store.select(selectIsLoggedIn).pipe(
            take(1),
            map((isLoggedIn) => {
                if (isLoggedIn) {
                    router.navigateByUrl('/');
                }

                return !isLoggedIn;
            })
        );
        return hasAccess ? true : router.createUrlTree(['/unauthorized']);
    };

    return guard;
};
