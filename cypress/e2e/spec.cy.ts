describe(`Url shortener`, () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Visits the initial project page', () => {
        cy.contains('Enter URL to shorten:');
    });

    it(`should shorten a URL when 'Generate' is clicked`, () => {
        cy.get('[data-testid="url-input"]').type('https://www.google.com');
        cy.get('[data-testid="options-button"]').contains('Generate').click();
        cy.get('[data-testid="short-url"]', { timeout: 5000 }).should(
            'be.visible'
        );
    });

    it(`should show an error message when 'Generate' is clicked with an invalid URL`, () => {
        cy.get('[data-testid="url-input"]').type('invalid-url');
        cy.get('[data-testid="options-button"]').contains('Generate').click();
        cy.get('[data-testid="invalid-url"]', { timeout: 5000 }).should(
            'be.visible'
        );
    });

    it(`should show an error message when 'Generate' is clicked with an empty URL`, () => {
        cy.get('[data-testid="options-button"]').contains('Generate').click();
        cy.get('[data-testid="invalid-url"]', { timeout: 5000 }).should(
            'be.visible'
        );
    });

    it(`should copy the short URL to clipboard when 'Copy' is clicked`, () => {
        cy.get('[data-testid="url-input"]').type('https://www.google.com');
        cy.get('[data-testid="options-button"]').contains('Generate').click();
        cy.get('[data-testid="copy-button"]').contains('Copy').click();
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                expect(text).to.not.be.empty;
            });
        });
    });
});
