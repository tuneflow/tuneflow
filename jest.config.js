/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/build',
    '<rootDir>/dist',
    '<rootDir>/docs',
    '<rootDir>/test',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['cobertura', 'text-summary', 'clover'],
};
