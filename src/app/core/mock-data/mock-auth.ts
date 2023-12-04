import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { USERS } from './db.data';

interface AuthRequest {
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    username?: string;
    password?: string;
    refresh_token?: string;
}

// ToDo: fix types (remove dangerous AS)

export class MockAuth {
    constructor(private reqInfo: RequestInfo) {}

    handleRequest(): Observable<ResponseOptions | unknown> | undefined {
        const {
            client_id,
            client_secret,
            grant_type,
            username,
            password,
            refresh_token,
        } =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.reqInfo.req as any)?.body ?? {};

        if (
            client_id !== 'fake-client-id' ||
            client_secret !== 'fake-secret-id'
        ) {
            return this.respond(this.throw400BadRequest());
        }

        let user: (typeof USERS)[number] | undefined;
        if (grant_type === 'refresh_token') {
            user = this.getUserByRefreshToken(refresh_token);
        } else if (grant_type === 'password') {
            user = this.getUserByCredentials(username, password);
        }

        return user
            ? this.respond(this.login(user))
            : this.respond(this.throw400BadRequest());
    }

    private login(user: (typeof USERS)[number]): ResponseOptions {
        const { headers, url } = this.reqInfo;
        return {
            status: 200,
            headers,
            url,
            body: {
                token_type: 'Bearer',
                expires_in: 86399,
                access_token: user.accessToken,
                refresh_token: user.refreshToken,
                scope: [],
            },
        };
    }

    private throw400BadRequest(): ResponseOptions {
        const { headers, url } = this.reqInfo;
        return {
            status: 400,
            headers,
            url,
            body: {
                status: 400,
                code: 'invalid_grant',
                message: 'Invalid grant: user credentials are invalid',
            },
        };
    }

    private getUserByRefreshToken(
        refreshToken: string
    ): (typeof USERS)[number] | undefined {
        return USERS.find((user) => user.refreshToken === refreshToken);
    }

    private getUserByCredentials(
        username: string,
        password: string
    ): (typeof USERS)[number] | undefined {
        return USERS.find(
            (user) => user.username === username && user.password === password
        );
    }

    private respond(response: ResponseOptions): Observable<unknown> {
        return this.reqInfo.utils.createResponse$(() => response);
    }
}
