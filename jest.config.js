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
        '<rootDir>/src/domain/@shared/notification/notification.ts',
        '<rootDir>/src/domain/**/entity/*entity.ts',
        '<rootDir>/src/application/usecases/**/**/*usecase.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/src/domain/@shared/notification/*spec.ts',
        '<rootDir>/src/domain/**/entity/*spec.ts',
        '<rootDir>/src/application/usecases/**/**/*spec.ts',
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
};
