import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;