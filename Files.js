const fs = require('fs');

class Files {
  static readFromFile(filePath) {
    return new Promise((resolve) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error('\x1b[31m%s\x1b[0m', `Could not read from ${filePath}. Stop.`);
          process.exit(1);
        }

        resolve(data.toString());
      });
    });
  }

  static writeToFile(filePath, fileContent) {
    return new Promise((resolve) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error('\x1b[31m%s\x1b[0m', `Could not write to ${filePath}. Stop.`);
          process.exit(1);
        }

        resolve();
      });
    });
  }
}

module.exports = Files;
