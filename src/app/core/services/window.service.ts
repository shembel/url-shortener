import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WindowService {
    // Moved here, so it will be easier to test shortener component without direct usage of window object
    openUrl(url: string): void {
        window.open(url, '_blank');
    }

    constructor() {}
}
