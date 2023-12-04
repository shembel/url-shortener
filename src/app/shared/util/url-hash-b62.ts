export class UrlHashB62 {
    private static readonly BASE62_CHARS =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    private static encodeBase62(value: number): string {
        let result = '';

        do {
            result = UrlHashB62.BASE62_CHARS.charAt(value % 62) + result;
            value = Math.floor(value / 62);
        } while (value > 0);

        return result;
    }

    private static generateRandomId(): number {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }

    static shortenUrl(originalUrl: string): string {
        console.log('Original URL:', originalUrl);
        const uniqueId = UrlHashB62.generateRandomId();

        const encodedId = UrlHashB62.encodeBase62(uniqueId);

        // const baseUrl = 'http://shembel.com';
        const baseUrl = 'http://localhost:4200/';
        const shortenedUrl = baseUrl + encodedId;

        console.log('Shortened URL:', shortenedUrl);
        return shortenedUrl;
    }
}
