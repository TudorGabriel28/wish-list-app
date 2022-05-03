/* eslint-disable */

const config = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./tests/jest.setup.js'],

  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)']
};

module.exports = config;
