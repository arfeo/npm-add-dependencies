const path = require('path');
const Files = require('../../lib/Files');
const {
  TEST_JSON_DIR, //
} = require('../jest.config');
const md5 = require('blueimp-md5');
const cmd = require('./cmd');

// no params
const defaultExpect = {
  dependencies: ['jest@26.0.0'],
  target: 'dependencies',
  overwrite: true,
  packageFilePath: './package.json',
};

const generateDefaultPackageJson = () => {
  return Files.readFromFile(
    path.resolve(__dirname, '../..', 'package.json')
  ).then((defaultPackageJsonString) => {
    const defaultPackageJson = JSON.parse(defaultPackageJsonString);
    defaultPackageJson.dependencies = {
      jest: '26.0.0',
    };
    defaultPackageJson.devDependencies = {
      jest: '26.0.0',
    };
    defaultPackageJson.optionalDependencies = {
      jest: '26.0.0',
    };
    defaultPackageJson.peerDependencies = {
      jest: '26.0.0',
    };
    defaultPackageJson.name = '';
    return defaultPackageJson;
  });
};

const cliRunAndVerify = async (
  done,
  packageJsonFilename,
  args,
  expectedJsonOverrides
) => {
  generateDefaultPackageJson().then((defaultPackageJson) => {
    Files.writeToFile(
      packageJsonFilename,
      JSON.stringify(defaultPackageJson)
    ).then(() => {
      cmd.execute('cli-index.js', args).then(() => {
        Files.readFromFile(packageJsonFilename).then((jsonResult) => {
          const expectedJson = {
            ...defaultPackageJson,
            ...expectedJsonOverrides,
          };
          try {
            expect(JSON.parse(jsonResult)).toEqual(expectedJson);
            // expect(console.log).toBeCalledWith('\x1b[32m%s\x1b[0m', 'Done.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
};

const runAndVerify = async (
  done,
  classForTesting,
  packageJsonFilename,
  testExpectObject,
  expectedJsonOverrides
) => {
  expect(classForTesting).toMatchObject(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(
      packageJsonFilename,
      JSON.stringify(defaultPackageJson)
    ).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJsonFilename).then((jsonResult) => {
          const expectedJson = {
            ...defaultPackageJson,
            ...expectedJsonOverrides,
          };
          try {
            expect(JSON.parse(jsonResult)).toEqual(expectedJson);
            expect(console.log).toBeCalledWith('\x1b[32m%s\x1b[0m', 'Done.');
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    )
  );
};

const runAndVerifyWithFailures = async (
  done,
  classForTesting,
  packageJson,
  testExpectObject
) => {
  expect(classForTesting).not.toEqual(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(
      () => {
        classForTesting.run().then(() =>
          Files.readFromFile(packageJson).then((expectedJson) => {
            expect(JSON.parse(expectedJson)).not.toEqual(defaultPackageJson);
            // expect(console.error).toBeCalledWith('\x1b[31m%s\x1b[0m', 'No dependencies passed. Stop.');
            // expect(process.exit).toHaveBeenCalledWith(1);
            done();
          })
        );
      }
    )
  );
};

const generateRandomFilename = async () =>
  path.resolve(TEST_JSON_DIR, `${md5(Math.random().toString())}package.json`);

module.exports = {
  defaultExpect,
  runAndVerify,
  runAndVerifyWithFailures,
  generateRandomFilename,
  generateDefaultPackageJson,
  cliRunAndVerify,
};
