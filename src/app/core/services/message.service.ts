import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: string[] = [];

    private showMessages = new BehaviorSubject(false);
    public showMessages$ = this.showMessages.asObservable();

    toggleShowMessages() {
        this.showMessages.next(!this.showMessages.value);
    }

    add(message: string) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}
