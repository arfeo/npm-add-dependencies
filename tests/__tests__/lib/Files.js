const Files = require('../../../lib/Files');
const fs = require('fs');
const path = require('path');
const {
  generateRandomFilename, //
} = require('../../__mocks__/utils');

describe('readFromFile() Tests', () => {
  test('file exists', async (done) => {
    Files.readFromFile(path.resolve('package.json'))
      .then((string) => {
        expect(string).toContain('"name": "add-dependencies"');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('throw when file doesnt exist', async (done) => {
    Files.readFromFile(path.resolve('gffgdssdfggfsdgfsdgfdgfd'))
      .then(() => {})
      .catch((e) => {
        expect(e.code).toEqual('ENOENT');
        done();
      });
  });
});

describe('writeToFile() Tests', () => {
  test('file exists and updates', async (done) => {
    generateRandomFilename().then((randomFilename) =>
      fs.writeFile(randomFilename, 'something', (err) => {
        Files.writeToFile(randomFilename, 'something else')
          .then(() =>
            fs.readFile(randomFilename, (err, string) => {
              expect(string.toString()).toContain('something else');
              done(err);
            })
          )
          .catch((e) => {
            done(e);
          });
      })
    );
  });

  test('creates when file doesnt exist', async (done) => {
    generateRandomFilename().then((randomFilename) => {
      Files.writeToFile(randomFilename, 'something else')
        .then(() =>
          fs.readFile(randomFilename, (err, string) => {
            expect(string.toString()).toContain('something else');
            done(err);
          })
        )
        .catch((e) => {
          done(e);
        });
    });
  });

  test('throw when folder doesnt exist', async (done) => {
    Files.writeToFile(
        path.resolve('some', 'random', 'folder.txt'),
        'something else'
      )
      .then(() => {})
      .catch((e) => {
        expect(e.code).toEqual('ENOENT');
        done();
      });
  });
});
