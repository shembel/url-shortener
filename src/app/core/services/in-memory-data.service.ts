import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Url } from '../modules/openapi/model/url';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const urls: Url[] = [
            {
                id: 'bbea622a-5e83-4f85-8982-d27cf437fb1c',
                shortUrl: 'https://shembel.com/ZaEOZRVn',
                fullUrl: 'https://www.google.com',
            },
            {
                id: uuidv4(),
                shortUrl: 'https://shembel.com/NcaHkbqnL',
                fullUrl: 'https://example.com',
            },
        ];
        return { urls };
    }
}
