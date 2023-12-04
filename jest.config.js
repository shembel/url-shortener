module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['./setup-jest.ts'],
    testPathIgnorePatterns: [
        './node_modules/',
        './dist/',
        './src/app/core/modules/openapi/',
    ],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$',
        },
    },
};
