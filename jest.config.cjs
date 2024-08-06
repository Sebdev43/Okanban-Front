

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/tests/**/*.(test|spec).js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

