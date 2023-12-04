import { Component } from '@angular/core';
import { ShortenerComponent } from '../../shared/ui/shortener/shortener.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ShortenerComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent {}
