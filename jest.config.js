const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    transform: {
        '^.+.(t|j)sx?$': ['@swc/jest'],
    },
    clearMocks: true,
    coverageProvider: 'v8',
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/domain/**/entity/*entity.ts',
        '<rootDir>/src/usecase/**/**/*usecase.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/domain/**/entity/*spec.ts', '<rootDir>/src/usecase/**/**/*spec.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
};
