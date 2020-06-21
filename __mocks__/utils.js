const path = require('path');
const Files = require('../lib/Files');
const { TEST_JSON_DIR } = require('../jest.config');
const md5 = require('blueimp-md5');

// no params
const defaultExpect = {
  dependencies: [],
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

const runAndVerifyWithFailures = async (done, classForTesting, packageJson) => {
  try {
    //  expect(classForTesting).toMatchObject(testExpectObject);
  } catch (e) {
    expect(e).toBeTruthy();
  }
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then(() => {
          try {
            // expect(JSON.parse(expectedJson)).toEqual(defaultPackageJson);
            done();
          } catch (e) {
            expect(e).toBeTruthy();
            done(e);
          }
        })
      )
    )
  );
};

const generateRandomFilename = async () => path.resolve(TEST_JSON_DIR, md5((Math.random() + Math.random()).toString()));

module.exports = {
  defaultExpect,
  runAndVerify,
  runAndVerifyWithFailures,
  generateRandomFilename,
};
