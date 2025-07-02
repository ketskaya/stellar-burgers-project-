import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
  '^@api$': '<rootDir>/src/utils/burger-api.ts',
  '^@utils-types$': '<rootDir>/src/utils/types',
  '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1'
}
};

export default config;
