const fs = require('fs');

class Files {
  static readFromFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return reject();
        }

        return resolve(data.toString());
      });
    });
  }

  static writeToFile(filePath, fileContent) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return reject();
        }

        return resolve();
      });
    });
  }
}

module.exports = Files;
