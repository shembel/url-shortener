import 'jest-preset-angular/setup-jest';
import '@ng-web-apis/universal/mocks';
import './jest-global-mocks';
import 'reflect-metadata';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';

TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule],
});
