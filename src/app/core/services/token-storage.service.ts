import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
    private readonly accessTokenKey: string;
    private readonly refreshTokenKey: string;

    constructor(
        private configService: ConfigService,
        private localStorageService: LocalStorageService
    ) {
        const authSettings = this.configService.getAuthSettings() || {
            accessTokenKey: 'accessToken',
            refreshTokenKey: 'refreshToken',
        };
        this.accessTokenKey = authSettings.accessTokenKey;
        this.refreshTokenKey = authSettings.refreshTokenKey;
    }

    getAccessToken(): string | null {
        const item = this.localStorageService.getItem(this.accessTokenKey);
        return item ? (item as string) : null;
    }

    getRefreshToken(): string | null {
        const item = this.localStorageService.getItem(this.refreshTokenKey);
        return item ? (item as string) : null;
    }

    saveAccessToken(token: string) {
        this.localStorageService.setItem(this.accessTokenKey, token);
    }

    saveRefreshToken(token: string) {
        this.localStorageService.setItem(this.refreshTokenKey, token);
    }

    saveTokens(accessToken: string, refreshToken: string) {
        this.saveAccessToken(accessToken);
        this.saveRefreshToken(refreshToken);
    }

    removeTokens() {
        this.localStorageService.removeItem(this.accessTokenKey);
        this.localStorageService.removeItem(this.refreshTokenKey);
    }
}
