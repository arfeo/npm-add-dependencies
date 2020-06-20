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

test('defaults', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
  };
  const classForTesting = new ClassForTesting([], ClassForTesting.CONSTANTS.DEPENDENCIES, true, packageJson);
  expect(classForTesting).toMatchObject(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then((expectedJson) => {
          try {
            expect(JSON.parse(expectedJson)).toEqual(defaultPackageJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    )
  );
});

test('with dependencies with override', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
    dependencies: ['jest@26.0.1'],
  };
  const classForTesting = new ClassForTesting(
    ['jest@26.0.1'],
    ClassForTesting.CONSTANTS.DEPENDENCIES,
    true,
    packageJson
  );
  expect(classForTesting).toMatchObject(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) =>
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then((expectedJson) => {
          defaultPackageJson.dependencies.jest = '26.0.1';
          try {
            expect(JSON.parse(expectedJson)).toEqual(defaultPackageJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    )
  );
});

test('no overwrite', async (done) => {
  const packageJson = path.resolve(TEST_JSON_DIR, md5(Math.random().toString()));
  const classForTesting = new ClassForTesting([], ClassForTesting.CONSTANTS.DEPENDENCIES, false, packageJson);
  const testExpectObject = {
    ...defaultExpect,
    packageFilePath: packageJson,
    overwrite: false,
  };
  expect(classForTesting).toMatchObject(testExpectObject);
  generateDefaultPackageJson().then((defaultPackageJson) => {
    Files.writeToFile(packageJson, JSON.stringify(defaultPackageJson)).then(() =>
      classForTesting.run().then(() =>
        Files.readFromFile(packageJson).then((expectedJson) => {
          try {
            expect(JSON.parse(expectedJson)).toEqual(defaultPackageJson);
            done();
          } catch (e) {
            done(e);
          }
        })
      )
    );
  });
});
// // package path
// test('package path', async () => {
//   const classForTesting = new ClassForTesting(
//     [],
//     ClassForTesting.CONSTANTS.DEPENDENCIES,
//     true,
//     'a/deeper/folder/package.json'
//   );
//   const testExpectOverrides = {
//     packageFilePath: 'a/deeper/folder/package.json',
//   };
//   expect(classForTesting).toMatchObject({ ...defaultExpect, ...testExpectOverrides });
// });
// // deps
// test('deps', async () => {
//   const dependencies = ['jquery'];
//   const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.DEPENDENCIES);
//   const testExpectOverrides = {
//     dependencies,
//   };
//   expect(classForTesting).toMatchObject({ ...defaultExpect, ...testExpectOverrides });
// });
// // dev deps
// test('dev deps', async () => {
//   const dependencies = ['jquery'];
//   const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.DEV_DEPENDENCIES);
//   const testExpectOverrides = {
//     dependencies,
//     target: 'devDependencies',
//   };
//   expect(classForTesting).toMatchObject({ ...defaultExpect, ...testExpectOverrides });
// });
// // optional deps
// test('optional deps', async () => {
//   const dependencies = ['jquery'];
//   const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.OPTIONAL_DEPENDENCIES);
//   const testExpectOverrides = {
//     dependencies,
//     target: 'optionalDependencies',
//   };
//   expect(classForTesting).toMatchObject({ ...defaultExpect, ...testExpectOverrides });
// });
// // peer deps
// test('peer deps', async () => {
//   const dependencies = ['jquery'];
//   const classForTesting = new ClassForTesting(dependencies, ClassForTesting.CONSTANTS.PEER_DEPENDENCIES);
//   const testExpectOverrides = {
//     dependencies,
//     target: 'peerDependencies',
//   };
//   expect(classForTesting).toMatchObject({ ...defaultExpect, ...testExpectOverrides });
// });
