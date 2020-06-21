const path = require('path');
const Files = require('../lib/Files');
const md5 = require('blueimp-md5');
const { TEST_JSON_DIR } = require('../jest.config');

const ClassForTesting = require('../index');

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

const writeJsonAndVerify = async (done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides) => {
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

test('run() fail to make sure tests themselves work', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const classForTesting = new ClassForTesting(['jquery'], ClassForTesting.CONSTANTS.DEPENDENCIES, true, packageJson);
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
});

test('run() with defaults', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
  };
  const classForTesting = new ClassForTesting([], ClassForTesting.CONSTANTS.DEPENDENCIES, true, packageJson);
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject).then();
});

test('run() with dependencies with override', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const dependencies = ['jest@26.0.1'];
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
    dependencies: dependencies,
  };
  const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.DEPENDENCIES, true, packageJson);
  const expectedJsonOverrides = {
    dependencies: {
      jest: '26.0.1',
    },
  };
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});

test('run() with no overwrite', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const dependencies = ['jest@26.0.1'];

  const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.DEPENDENCIES, false, packageJson);
  const testExpectObject = {
    ...defaultExpect,
    dependencies: dependencies,
    packageFilePath: packageJson,
    overwrite: false,
  };
  const expectedJsonOverrides = {};
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});

test('run() with package path', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const classForTesting = new ClassForTesting([], ClassForTesting.CONSTANTS.DEPENDENCIES, true, packageJson);
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
  };
  const expectedJsonOverrides = {};
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});

test('run() with dev dependencies overwrite with caret', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const dependencies = ['jest@^26.0.1'];
  const classForTesting = new ClassForTesting(
    dependencies,
    ClassForTesting.CONSTANTS.DEV_DEPENDENCIES,
    true,
    packageJson
  );
  const testExpectObject = {
    ...defaultExpect,
    dependencies: dependencies,
    packageFilePath: packageJson,
    target: 'devDependencies',
  };

  const expectedJsonOverrides = {
    devDependencies: {
      jest: '^26.0.1',
    },
  };
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});

test('run() with optional dependencies overwrite lower', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const dependencies = ['jest@25.0.0'];
  const classForTesting = new ClassForTesting(
    dependencies,
    ClassForTesting.CONSTANTS.OPTIONAL_DEPENDENCIES,
    true,
    packageJson
  );
  const testExpectObject = {
    ...defaultExpect,
    dependencies: dependencies,
    packageFilePath: packageJson,
    target: 'optionalDependencies',
  };
  const expectedJsonOverrides = {
    optionalDependencies: {
      jest: '25.0.0',
    },
  };
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});

test('run() with peer dependencies overwrite', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const dependencies = ['jest@26.0.1'];
  const classForTesting = new ClassForTesting(
    dependencies,
    ClassForTesting.CONSTANTS.PEER_DEPENDENCIES,
    true,
    packageJson
  );
  const testExpectObject = {
    ...defaultExpect,
    dependencies: dependencies,
    packageFilePath: packageJson,
    target: 'peerDependencies',
  };
  const expectedJsonOverrides = {
    peerDependencies: {
      jest: '26.0.1',
    },
  };
  writeJsonAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
});
