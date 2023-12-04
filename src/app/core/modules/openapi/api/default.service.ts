/**
 * url-shortener
 * This is a URL shortener API.
 *
 * OpenAPI spec version: 1.0
 * Contact: vadim.uvin2@swisscom.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 *
 * Sorry for ^ that
 * (╯°□°）╯︵ ┻━┻
 *
 */ /* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpResponse,
    HttpEvent,
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { LoginInfo } from '../model/loginInfo';
import { Url } from '../model/url';
import { UrlItem } from '../model/urlItem';
import { UserLoginRequest } from '../model/userLoginRequest';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { DefaultServiceInterface } from './default.serviceInterface';

@Injectable({
    providedIn: 'root',
})
export class DefaultService implements DefaultServiceInterface {
    // ToDo: remove and make it configurable via DI, not hardcoded because its faster
    // NB: /api suffix is needed for angular-in-memory-web-api backend mock
    protected basePath = 'http://localhost:4200/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(
        protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath?: string,
        @Optional() configuration?: Configuration
    ) {
        // debugger;
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     * Logout
     * Logs the logged in user out
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteLogin(
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<any>;
    public deleteLogin(
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<any>>;
    public deleteLogin(
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<any>>;
    public deleteLogin(
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.accessToken) {
            const accessToken =
                typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken()
                    : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<any>(
            'delete',
            `${this.basePath}/login`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
            }
        );
    }

    /**
     * Delete short URL
     * Disable a short URL.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUrls(
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<any>;
    public deleteUrls(
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<any>>;
    public deleteUrls(
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<any>>;
    public deleteUrls(
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.accessToken) {
            const accessToken =
                typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken()
                    : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<any>('delete', `${this.basePath}/urls`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress,
        });
    }

    /**
     * Get URLs
     * Get URLs. For a user, it shows only user URLs. In case admin is logged in, it shows all URLs accross all users.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUrls(
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<Array<UrlItem>>;
    public getUrls(
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<Array<UrlItem>>>;
    public getUrls(
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<Array<UrlItem>>>;
    public getUrls(
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.accessToken) {
            const accessToken =
                typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken()
                    : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = ['application/json'];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<Array<UrlItem>>(
            'get',
            `${this.basePath}/urls`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
            }
        );
    }

    /**
     * Get single URL
     * Returns concrete URL
     * @param urlUuid UUID of the URL to show
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUrlsByUuid(
        urlUuid: string,
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<Url>;
    public getUrlsByUuid(
        urlUuid: string,
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<Url>>;
    public getUrlsByUuid(
        urlUuid: string,
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<Url>>;
    public getUrlsByUuid(
        urlUuid: string,
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        if (urlUuid === null || urlUuid === undefined) {
            throw new Error(
                'Required parameter urlUuid was null or undefined when calling getUrlsByUuid.'
            );
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.accessToken) {
            const accessToken =
                typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken()
                    : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = ['application/json'];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<Url>(
            'get',
            `${this.basePath}/urls/${encodeURIComponent(String(urlUuid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
            }
        );
    }

    /**
     * Login
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postLogin(
        body?: UserLoginRequest,
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<LoginInfo>;
    public postLogin(
        body?: UserLoginRequest,
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<LoginInfo>>;
    public postLogin(
        body?: UserLoginRequest,
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<LoginInfo>>;
    public postLogin(
        body?: UserLoginRequest,
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = ['application/json'];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = ['application/json'];
        const httpContentTypeSelected: string | undefined =
            this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<LoginInfo>(
            'post',
            `${this.basePath}/login`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
            }
        );
    }

    /**
     * Create short URL
     * Create a new short url
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUrls(
        body?: UrlItem,
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<any>;
    public postUrls(
        body?: UrlItem,
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<any>>;
    public postUrls(
        body?: UrlItem,
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<any>>;
    public postUrls(
        body?: UrlItem,
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.accessToken) {
            const accessToken =
                typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken()
                    : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = ['application/json'];
        const httpContentTypeSelected: string | undefined =
            this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post', `${this.basePath}/urls`, {
            body: body,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress,
        });
    }

    /**
     * Resolve short URL
     * Resolves short URL into long URL. Not for frontend.
     * @param shortUrl
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public resolveShortUrl(
        shortUrl: string,
        observe?: 'body',
        reportProgress?: boolean
    ): Observable<any>;
    public resolveShortUrl(
        shortUrl: string,
        observe?: 'response',
        reportProgress?: boolean
    ): Observable<HttpResponse<any>>;
    public resolveShortUrl(
        shortUrl: string,
        observe?: 'events',
        reportProgress?: boolean
    ): Observable<HttpEvent<any>>;
    public resolveShortUrl(
        shortUrl: string,
        observe: any = 'body',
        reportProgress: boolean = false
    ): Observable<any> {
        if (shortUrl === null || shortUrl === undefined) {
            throw new Error(
                'Required parameter shortUrl was null or undefined when calling resolveShortUrl.'
            );
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [];
        const httpHeaderAcceptSelected: string | undefined =
            this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<any>(
            'get',
            `${this.basePath}/to/${encodeURIComponent(String(shortUrl))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
            }
        );
    }
}
