const argv = require('../__mocks__/argv');
const {
  cliRunAndVerifyWithFailures,
  cliRunAndVerify,
  generateRandomFilename,
  defaultExpect,
} = require('../__mocks__/utils');

describe('cli run()', async () => {
  test('test argv mock', (done) => {
    argv('--arg1 value1').then((input) => {
      expect(input).toEqual(['--arg1', 'value1']);
      done();
    });
  });

  test('cli fail to make sure tests themselves work', async (done) => {
    cliRunAndVerifyWithFailures(done, 'dependencies').then();
  });

  // test('cli with defaults', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       packageFilePath: packageJson,
  //     };
  //     cliRunAndVerify(done, testExpectObject).then();
  //   });
  // });
  //
  // test('run() with dependencies with override', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const dependencies = ['jest@26.0.1'];
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       packageFilePath: packageJson,
  //       dependencies: dependencies,
  //     };
  //     const classForTesting = new ClassForTesting(
  //       dependencies,
  //       ClassForTesting.CONSTANTS.DEPENDENCIES,
  //       true,
  //       packageJson
  //     );
  //     const expectedJsonOverrides = {
  //       dependencies: {
  //         jest: '26.0.1',
  //       },
  //     };
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
  //
  // test('run() with no overwrite', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const dependencies = ['jest@26.0.1'];
  //
  //     const classForTesting = new ClassForTesting(
  //       dependencies,
  //       ClassForTesting.CONSTANTS.DEPENDENCIES,
  //       false,
  //       packageJson
  //     );
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       dependencies: dependencies,
  //       packageFilePath: packageJson,
  //       overwrite: false,
  //     };
  //     const expectedJsonOverrides = {};
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
  //
  // test('run() with package path', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const classForTesting = new ClassForTesting(
  //       ['jest@26.0.0'],
  //       ClassForTesting.CONSTANTS.DEPENDENCIES,
  //       true,
  //       packageJson
  //     );
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       packageFilePath: packageJson,
  //     };
  //     const expectedJsonOverrides = {};
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
  //
  // test('run() with dev dependencies overwrite with caret', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const dependencies = ['jest@^26.0.1'];
  //     const classForTesting = new ClassForTesting(
  //       dependencies,
  //       ClassForTesting.CONSTANTS.DEV_DEPENDENCIES,
  //       true,
  //       packageJson
  //     );
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       dependencies: dependencies,
  //       packageFilePath: packageJson,
  //       target: 'devDependencies',
  //     };
  //
  //     const expectedJsonOverrides = {
  //       devDependencies: {
  //         jest: '^26.0.1',
  //       },
  //     };
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
  //
  // test('run() with optional dependencies overwrite lower', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const dependencies = ['jest@25.0.0'];
  //     const classForTesting = new ClassForTesting(
  //       dependencies,
  //       ClassForTesting.CONSTANTS.OPTIONAL_DEPENDENCIES,
  //       true,
  //       packageJson
  //     );
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       dependencies: dependencies,
  //       packageFilePath: packageJson,
  //       target: 'optionalDependencies',
  //     };
  //     const expectedJsonOverrides = {
  //       optionalDependencies: {
  //         jest: '25.0.0',
  //       },
  //     };
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
  //
  // test('run() with peer dependencies overwrite', async (done) => {
  //   generateRandomFilename().then((packageJson) => {
  //     const dependencies = ['jest@26.0.1'];
  //     const classForTesting = new ClassForTesting(
  //       dependencies,
  //       ClassForTesting.CONSTANTS.PEER_DEPENDENCIES,
  //       true,
  //       packageJson
  //     );
  //     const testExpectObject = {
  //       ...defaultExpect,
  //       dependencies: dependencies,
  //       packageFilePath: packageJson,
  //       target: 'peerDependencies',
  //     };
  //     const expectedJsonOverrides = {
  //       peerDependencies: {
  //         jest: '26.0.1',
  //       },
  //     };
  //     runAndVerify(done, classForTesting, packageJson, testExpectObject, expectedJsonOverrides).then();
  //   });
  // });
});
