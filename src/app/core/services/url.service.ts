import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { DefaultService, Url, UrlItem } from '../modules/openapi';

import { UrlHashB62 } from '../../shared/util/url-hash-b62';
import { v4 as uuidv4 } from 'uuid';

import { MessageService } from './message.service';

// ToDo: fix and use configuration parameter and not fix the base path in the default servics
// import { CustomDefaultService } from '../providers/api.service.provider';

@Injectable({
    providedIn: 'root',
})

// ToDo: derive subclass and inject properly
export class UrlService {
    constructor(
        public api: DefaultService,
        private messageService: MessageService
    ) {}

    shortenUrl(url: string): Observable<UrlItem> {
        const urlHash = UrlHashB62.shortenUrl(url);
        const urlObject: UrlItem = {
            id: uuidv4(),
            shortUrl: urlHash,
            fullUrl: url,
        };

        return this.api.postUrls(urlObject).pipe(
            tap((url: UrlItem) => {
                return this.log(
                    `Created new short url: \n
                         # id=${url.id} \n
                         # shortUrl=${url.shortUrl} \n
                         # fullUrl=${url.fullUrl}`
                );
            }),
            catchError(this.handleError<UrlItem>('shortenUrl'))
        );
    }

    getUrlFromHash(shortUrl: string): Observable<Url> {
        return this.api.getUrlsByUuid(shortUrl).pipe(
            tap((url: Url) => {
                return this.log(
                    `Fetched url with id=${url.id} and shortUrl=${url.shortUrl}`
                );
            }),
            catchError(this.handleError<Url>('getUrlFromHash'))
        );
    }

    getAllUrls(): Observable<UrlItem[]> {
        console.log('Fetching urls...');

        return this.api.getUrls().pipe(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tap((urls) => this.log(`fetched urls: ${JSON.stringify(urls)}`)),
            catchError(this.handleError<UrlItem[]>('getAllUrls', []))
        );
    }

    // ToDo: change spec? plural form is used, but description is in singular
    // (´סּ︵סּ`)
    // deleteUrl(id: string): Observable<UrlItem> {
    //     return this.api.deleteUrls(id);
    // }

    getUrlAnalytics(id: string): Observable<UrlItem> {
        return this.api.getUrlsByUuid(id);
    }

    getUrlsAnalytics(): Observable<UrlItem[]> {
        return this.api.getUrls();
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: Error): Observable<T> => {
            // TODO: maybe send the error to remote logging infrastructure
            console.error(error);

            // TODO: improve wording for better UX
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(`Url service: ${message}`);
        this.messageService.add(`>_ ${message}`);
    }
}
