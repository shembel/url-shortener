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

// module.exports = {
//     preset: 'jest-preset-angular',
//     setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//     testPathIgnorePatterns: [
//         '<rootDir>/node_modules/',
//         '<rootDir>/dist/',
//         '<rootDir>/src/app/core/modules/openapi/',
//     ],
//     globals: {
//         'ts-jest': {
//             tsConfig: '<rootDir>/tsconfig.spec.json',
//             stringifyContentPathRegex: '\\.html$',
//         },
//     },
// };
