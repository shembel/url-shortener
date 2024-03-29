Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
    value: () => {
        return {
            display: 'none',
            appearance: ['-webkit-appearance'],
        };
    },
});
Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});

class MockIntersectionObserver {
    constructor() {}
    disconnect() {
        return null;
    }
    observe() {
        return null;
    }
    takeRecords() {
        return null;
    }
    unobserve() {
        return null;
    }
}
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});
Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

Object.defineProperty(window, 'AnimationEvent', {
    writable: true,
    configurable: true,
    value: {},
});

Object.defineProperty(global, 'AnimationEvent', {
    writable: true,
    configurable: true,
    value: {},
});

Object.defineProperty(window, 'TransitionEvent', {
    writable: true,
    configurable: true,
    value: {},
});

Object.defineProperty(global, 'TransitionEvent', {
    writable: true,
    configurable: true,
    value: {},
});

Object.defineProperty(window, 'DragEvent', {
    writable: true,
    configurable: true,
    value: {},
});
Object.defineProperty(global, 'DragEvent', {
    writable: true,
    configurable: true,
    value: {},
});
