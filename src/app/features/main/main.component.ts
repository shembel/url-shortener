import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShortenerComponent } from '../shortener/shortener.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ShortenerComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
