const fs = require('fs');
const path = require('path');
const {
  TEST_JSON_DIR, //
} = require('../jest.config');

module.exports = async () => {
  fs.readdir(TEST_JSON_DIR, (_, files) =>
    files.forEach((file) =>
      fs.unlink(path.resolve(TEST_JSON_DIR, file), () =>
        fs.rmdir(TEST_JSON_DIR, () => {})
      )
    )
  );
};
