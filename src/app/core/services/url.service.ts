import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DefaultService, Url, UrlItem } from '../modules/openapi';

import { shortenUrlHashB62 } from '../../shared/util/url-hash-b62';
import { v4 as uuidv4 } from 'uuid';

import { MessageService } from './message.service';

// ToDo: fix and use configuration parameter and not fix the base path in the default servics

@Injectable({
    providedIn: 'root',
})

// ToDo: derive subclass and inject properly
export class UrlService {
    private destroy$ = new Subject<void>();

    public isLoading = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading.asObservable();

    public updateIsLoadingStatus(newStatus: boolean) {
        this.isLoading.next(newStatus);
    }

    constructor(
        public api: DefaultService,
        private messageService: MessageService
    ) {}

    // ToDo: implement timeouts for long running / failing requests
    shortenUrl(url: string): Observable<UrlItem> {
        this.updateIsLoadingStatus(true);

        const urlHash = shortenUrlHashB62(url);
        const urlObject: UrlItem = {
            id: uuidv4(),
            shortUrl: urlHash,
            fullUrl: url,
        };

        return this.api.postUrls(urlObject).pipe(
            tap((url: UrlItem) => {
                this.updateIsLoadingStatus(false);
                this.log(
                    `Created new short url: \n # id=${url.id} \n # shortUrl=${url.shortUrl} \n # fullUrl=${url.fullUrl}`
                );
            }),
            catchError((error) => {
                this.updateIsLoadingStatus(false);
                return this.handleError<UrlItem>('shortenUrl')(error);
            })
        );
    }
    getUrlFromHash(shortUrl: string): Observable<Url> {
        this.updateIsLoadingStatus(true);

        return this.api.getUrlsByUuid(shortUrl).pipe(
            tap((url: Url) => {
                this.updateIsLoadingStatus(false);
                this.log(
                    `Fetched URL with id=${url.id} and shortUrl=${url.shortUrl}`
                );
            }),
            catchError((error) => {
                this.updateIsLoadingStatus(false);
                return this.handleError<Url>('getUrlFromHash')(error);
            })
        );
    }

    getAllUrls(): Observable<UrlItem[]> {
        this.updateIsLoadingStatus(true);

        return this.api.getUrls().pipe(
            tap((urls: UrlItem[]) => {
                this.updateIsLoadingStatus(false);
                this.log(`Fetched URLs: ${JSON.stringify(urls)}`);
            }),
            catchError((error) => {
                this.updateIsLoadingStatus(false);
                return this.handleError<UrlItem[]>('getAllUrls', [])(error);
            })
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
        this.updateIsLoadingStatus(false);

        return (error: Error): Observable<T> => {
            // TODO: maybe send the error to remote logging infrastructure
            // console.error(error);

            // TODO: improve wording for better UX
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`>_ ${message}`);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
