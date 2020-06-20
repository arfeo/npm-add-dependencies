const path = require('path');
const TEST_JSON_DIR = path.resolve(__dirname, '__tests__', 'testJsonFolder');

module.exports = {
  verbose: true,
  TEST_JSON_DIR,
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
};
