import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { USERS } from './db.data';
import { MockAuth } from './mock-auth';

@Injectable({ providedIn: 'root' })
export class MockAuthApiService implements InMemoryDbService {
    createDb() {
        const users = USERS.map(({ id, firstName, lastName }) => ({
            id,
            firstName,
            lastName,
        }));

        return { users };
    }

    post(ri: RequestInfo) {
        if (ri.collectionName === 'auth') {
            return new MockAuth(ri).handleRequest();
        }

        return undefined;
    }

    get(ri: RequestInfo) {
        if (ri.collectionName === 'auth' && ri.id === 'logout') {
            const { headers, url } = ri;
            return ri.utils.createResponse$(() => ({
                status: 200,
                headers,
                url,
            }));
        }

        if (ri.collectionName === 'users' && ri.id === 'me') {
            const accessToken = ri.query.get('auth-token')?.[0];
            const user = USERS.find((user) => user.accessToken === accessToken);
            ri.id = user?.id;
        }

        return undefined;
    }
}
