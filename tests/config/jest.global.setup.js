const fs = require('fs');
const {
  TEST_JSON_DIR, //
} = require('../jest.config');
module.exports = () => {
  fs.mkdirSync(TEST_JSON_DIR);
};
