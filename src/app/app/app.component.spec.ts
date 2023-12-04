import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UrlService } from '../core/services/url.service';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, HttpClientModule],
            providers: [UrlService, HttpClientModule],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'url-shortener' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('url-shortener');
    });

    // ToDo: fix taiga-ui problem with NG05105: Unexpected synthetic property @tuiParentAnimation found.
    //     it('should render title', () => {
    //         const fixture = TestBed.createComponent(AppComponent);
    //         // fixture.detectChanges();
    //         const compiled = fixture.nativeElement as HTMLElement;
    //         expect(compiled.querySelector('h1')?.textContent).toContain(
    //             'Hello, url-shortener'
    //         );
    //     });
});
