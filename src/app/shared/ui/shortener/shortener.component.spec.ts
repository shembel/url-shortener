import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenerComponent } from './shortener.component';
import { UrlService } from '../../../core/services/url.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShortenerComponent', () => {
    let component: ShortenerComponent;
    let fixture: ComponentFixture<ShortenerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShortenerComponent, HttpClientModule],
            providers: [UrlService, HttpClientModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ShortenerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
