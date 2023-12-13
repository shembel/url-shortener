import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AuthFacade } from '../../auth/store/auth.facade';

import { ShortenerComponent } from './shortener.component';

describe('ShortenerComponent', () => {
    let windowSpy: jest.SpyInstance;
    let component: ShortenerComponent;
    let fixture: ComponentFixture<ShortenerComponent>;

    beforeEach(async () => {
        windowSpy = jest.spyOn(window, 'open');

        windowSpy.mockImplementation(() => ({
            open: jest.fn(),
        }));

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                StoreModule.forRoot({}),
            ],
            providers: [AuthFacade],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShortenerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form controls', () => {
        expect(component.urlShortenerForm.get('url')).toBeTruthy();
    });

    it('should submit form with valid URL', () => {
        const submitSpy = jest.spyOn(component, 'submit');
        component.urlShortenerForm.setValue({ url: 'https://example.com' });
        component.submit('Generate');
        expect(submitSpy).toHaveBeenCalledWith('Generate');
        expect(component.isInvalidUrl$).toBe(false);
    });

    it('should not submit form with invalid URL', () => {
        const submitSpy = jest.spyOn(component, 'submit');
        component.urlShortenerForm.setValue({ url: 'invalid-url' });
        component.submit('Generate');
        expect(submitSpy).toHaveBeenCalledWith('Generate');
        expect(component.isInvalidUrl$).toBe(true);
    });

    it('should copy short URL to clipboard', () => {
        const alertsOpenSpy = jest.spyOn(component.alerts, 'open');
        component.onClickCopy('https://short-url.com');
        expect(alertsOpenSpy).toHaveBeenCalledWith('https://short-url.com');
        expect(component.shortURL).toBe('');
    });

    it('should open URL in a new window', () => {
        const openUrlSpy = jest.spyOn(component.windowService, 'openUrl');
        component.openUrl('https://example.com');
        expect(openUrlSpy).toHaveBeenCalledWith('https://example.com');
    });
});
