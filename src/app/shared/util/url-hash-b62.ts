const BASE62_CHARS =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function encodeBase62(value: number): string {
    let result = '';

    do {
        result = BASE62_CHARS.charAt(value % 62) + result;
        value = Math.floor(value / 62);
    } while (value > 0);

    return result;
}

function generateRandomId(): number {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

function shortenUrlHashB62(originalUrl: string): string {
    console.log('Original URL:', originalUrl);
    const uniqueId = generateRandomId();

    const encodedId = encodeBase62(uniqueId);

    // const baseUrl = 'http://localhost:4200/';
    const baseUrl = 'https://shembel.com/';
    const shortenedUrl = baseUrl + encodedId;

    console.log('Shortened URL:', shortenedUrl);
    return shortenedUrl;
}

export { shortenUrlHashB62 };
