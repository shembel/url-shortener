import { Observable, of } from 'rxjs';
import { Url, UrlItem } from '../modules/openapi';

export class MockUrlService {
    public isLoading$ = of(false);

    private mockShortUrl: UrlItem = {
        id: 'mock-id',
        shortUrl: 'http://short.mock/test',
        fullUrl: 'http://full.mock/test',
    };

    private mockUrlList: UrlItem[] = [
        {
            id: '1',
            shortUrl: 'http://short.mock/1',
            fullUrl: 'http://full.mock/1',
        },
        {
            id: '2',
            shortUrl: 'http://short.mock/2',
            fullUrl: 'http://full.mock/2',
        },
    ];

    public updateIsLoadingStatus(newStatus: boolean): void {
        console.log(newStatus);
    }

    public shortenUrl(url: string): Observable<UrlItem> {
        console.log(url);
        return of(this.mockShortUrl);
    }

    public getUrlFromHash(shortUrl: string): Observable<Url> {
        const foundUrl = this.mockUrlList.find(
            (url) => url.shortUrl === shortUrl
        );
        return of(foundUrl as Url); // Cast to Url if necessary
    }

    public getAllUrls(): Observable<UrlItem[]> {
        return of(this.mockUrlList);
    }

    public getUrlAnalytics(id: string): Observable<UrlItem> {
        const foundUrl = this.mockUrlList.find((url) => url.id === id);
        return of(foundUrl) as Observable<UrlItem>; // WIP: Cast to UrlItem if necessary
    }

    public getUrlsAnalytics(): Observable<UrlItem[]> {
        return of(this.mockUrlList);
    }
}
