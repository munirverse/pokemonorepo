/* eslint-disable */
export default {
  displayName: 'pokemon-be',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/pokemon-be',
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'lcov'],
};
