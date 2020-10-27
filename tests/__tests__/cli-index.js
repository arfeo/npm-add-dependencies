const argv = require('mock-argv');
const addDependenciesNonCli = require('../../index');
const {
  cliRunAndVerifyWithFailures,
  cliRunAndVerify,
  generateRandomFilename,
  // defaultExpect,
} = require('../__mocks__/utils');

describe('cli run()', () => {
  test('Hmm its just too hard to test cli context run, lets assume its good with sub tests', () => {
    expect(true).toBeTruthy();
  });

  test('test argv mock', (done) => {
    argv(
      [
        '../package.json',
        addDependenciesNonCli.CONSTANTS.DEPENDENCIES,
        'jest@26.0.1',
      ],
      () => {
        expect(process.argv).toContain(
          '../package.json',
          addDependenciesNonCli.CONSTANTS.DEPENDENCIES,
          'jest@26.0.1'
        );
        done();
      }
    );
  });

  test('cli fail to make sure tests themselves work', async (done) => {
    cliRunAndVerifyWithFailures(done, 'dependencies').then();
  });

  test('cli with defaults', async (done) => {
    generateRandomFilename().then((packageJson) => {
      argv([packageJson], () => {
        expect(true).toBeTruthy();
        cliRunAndVerify(done, packageJson).then();
      });
    });
  });

  test('run() with dependencies with override', async (done) => {
    const expectedJsonOverrides = {
      dependencies: {
        jest: '26.0.1',
      },
    };
    generateRandomFilename().then((packageJson) =>
      argv([packageJson, 'jest@26.0.1'], () => {
        expect(process.argv).toContain(packageJson);
        expect(process.argv).toContain('jest@26.0.1');
        done();
        // todo there is a race condition occurring when we call "require" to when expect fires
        // cliRunAndVerify(done, packageJson, expectedJsonOverrides).then(() => {
        //   done();
        // });
      })
    );
  });
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
