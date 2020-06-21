const path = require('path');
const Files = require('../lib/Files');
const argv = require('./argv');
const { TEST_JSON_DIR } = require('../jest.config');
const md5 = require('blueimp-md5');

// no params
const defaultExpect = {
  dependencies: ['jest@26.0.0'],
  target: 'dependencies',
  overwrite: true,
  packageFilePath: './package.json',
};

const generateDefaultPackageJson = () => {
  return Files.readFromFile(path.resolve(__dirname, '../', 'package.json')).then((defaultPackageJsonString) => {
    const defaultPackageJson = JSON.parse(defaultPackageJsonString);
    defaultPackageJson.dependencies = { jest: '26.0.0' };
    defaultPackageJson.devDependencies = { jest: '26.0.0' };
    defaultPackageJson.optionalDependencies = { jest: '26.0.0' };
    defaultPackageJson.peerDependencies = { jest: '26.0.0' };
    defaultPackageJson.name = '';
    return defaultPackageJson;
  });
};

const cliRunAndVerify = async (done, testExpectObject, expectedJsonOverrides) => {
  generateRandomFilename().then((packageJson) => {
    const testExpectObject = {
      ...defaultExpect,
      packageFilePath: packageJson,
    };
    // require('../cli-index')
    generateDefaultPackageJson().then((defaultPackageJson) => {
      Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
        Files.readFromFile(packageJson).then((jsonResult) => {
          const expectedJson = { ...defaultPackageJson, ...expectedJsonOverrides };
          try {
            expect(JSON.parse(jsonResult)).toEqual(expectedJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      );
    });
  });
};

const runAndVerify = async (done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides) => {
  expect(classForTesting).toMatchObject(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then((jsonResult) => {
          const expectedJson = { ...defaultPackageJson, ...expectedJsonOverrides };
          try {
            expect(JSON.parse(jsonResult)).toEqual(expectedJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    )
  );
};

const cliRunAndVerifyWithFailures = async (done, inputsString) => {
  jest.spyOn(process, 'exit').mockImplementation(() => {});
  generateRandomFilename().then((packageJson) => {
    argv(inputsString + ` ${packageJson}`).then(() => {
      generateDefaultPackageJson().then((defaultPackageJson) => {
        Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() => {
          require('../cli-index');
          try {
            // add test to test log
            expect(process.exit).toHaveBeenCalledWith(1);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
};

const runAndVerifyWithFailures = async (done, classForTesting, packageJson, testExpectObject) => {
  expect(classForTesting).not.toEqual(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then((expectedJson) => {
          try {
            expect(JSON.parse(expectedJson)).not.toEqual(defaultPackageJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    )
  );
};

const generateRandomFilename = async () =>
  path.resolve(
    TEST_JSON_DIR,
    md5(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  );

module.exports = {
  defaultExpect,
  runAndVerify,
  runAndVerifyWithFailures,
  generateRandomFilename,
  cliRunAndVerifyWithFailures,
  cliRunAndVerify,
};