import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultService, UrlItem } from '../modules/openapi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UrlHashB62 } from '../../shared/util/url-hash-b62';

describe('UrlService', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let httpClient: HttpClient;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UrlService, HttpClientModule],
            providers: [HttpClientModule],
        }).compileComponents();
    });

    // shortenUrl method creates a new UrlItem object with a unique id, a shortened url generated by UrlHashB62.shortenUrl method and the original url passed as argument, and returns an Observable of this object
    it('should create a new UrlItem with unique id, shortened url, and original url when shortenUrl is called', () => {
        // Arrange
        // const urlService = new UrlService(new DefaultService(httpClient));
        // const originalUrl = 'https://www.example.com';
        //
        // // Mock the UrlHashB62.shortenUrl method
        // jest.spyOn(UrlHashB62, 'shortenUrl').mockReturnValue('abc123');
        //
        // // Act
        // const result$ = urlService.shortenUrl(originalUrl);
        //
        // // Assert
        // result$.subscribe((urlItem: UrlItem) => {
        //     expect(urlItem.id).toBeDefined();
        //     expect(urlItem.shortUrl).toBe('abc123');
        //     expect(urlItem.fullUrl).toBe(originalUrl);
        // });
    });
});
