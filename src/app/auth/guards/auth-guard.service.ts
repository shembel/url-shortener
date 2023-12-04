import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { selectIsLoggedIn } from '../store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
    constructor(
        private router: Router,
        private store: Store
    ) {}

    canActivate(): Observable<boolean> {
        return this.store.select(selectIsLoggedIn).pipe(
            take(1),
            tap((isLoggedIn) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
