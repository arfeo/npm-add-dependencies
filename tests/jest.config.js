const path = require('path');
const TEST_JSON_DIR = path.resolve(__dirname, '__tests__', 'testJsonFolder');

module.exports = {
  verbose: true,
  TEST_JSON_DIR,
  setupFilesAfterEnv: ['./config/jest.setup.js'],
  globalSetup: './config/jest.global.setup.js',
  globalTeardown: './config/jest.global.teardown.js',
};
