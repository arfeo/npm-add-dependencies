const addDependencies = require('../../index');
const {
  runAndVerifyWithFailures,
  runAndVerify,
  generateRandomFilename,
  defaultExpect,
} = require('../__mocks__/utils');

// todo add a test for connection timeout this made me think i had fucked it allll up :D
describe('nodeJS run()', () => {
  test('fail to make sure tests themselves work', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const testExpectObject = {
        ...defaultExpect,
        packageFilePath: packageJson,
      };
      const classForTesting = new addDependencies(
        ['jest'],
        addDependencies.CONSTANTS.DEPENDENCIES,
        true,
        packageJson
      );
      runAndVerifyWithFailures(
        done,
        classForTesting,
        packageJson,
        testExpectObject
      ).then();
    });
  });

  test('with defaults', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const testExpectObject = {
        ...defaultExpect,
        packageFilePath: packageJson,
      };
      const classForTesting = new addDependencies(
        ['jest@26.0.0'],
        addDependencies.CONSTANTS.DEPENDENCIES,
        true,
        packageJson
      );
      const expectedJsonOverrides = {};
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with dependencies with override', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const dependencies = ['jest@26.0.1'];
      const testExpectObject = {
        ...defaultExpect,
        packageFilePath: packageJson,
        dependencies: dependencies,
      };
      const classForTesting = new addDependencies(
        dependencies,
        addDependencies.CONSTANTS.DEPENDENCIES,
        true,
        packageJson
      );
      const expectedJsonOverrides = {
        dependencies: {
          jest: '26.0.1',
        },
      };
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with no overwrite', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const dependencies = ['jest@26.0.1'];

      const classForTesting = new addDependencies(
        dependencies,
        addDependencies.CONSTANTS.DEPENDENCIES,
        false,
        packageJson
      );
      const testExpectObject = {
        ...defaultExpect,
        dependencies: dependencies,
        packageFilePath: packageJson,
        overwrite: false,
      };
      const expectedJsonOverrides = {};
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with package path', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const classForTesting = new addDependencies(
        ['jest@26.0.0'],
        addDependencies.CONSTANTS.DEPENDENCIES,
        true,
        packageJson
      );
      const testExpectObject = {
        ...defaultExpect,
        packageFilePath: packageJson,
      };
      const expectedJsonOverrides = {};
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with dev dependencies overwrite with caret', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const dependencies = ['jest@^26.0.1'];
      const classForTesting = new addDependencies(
        dependencies,
        addDependencies.CONSTANTS.DEV_DEPENDENCIES,
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
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with optional dependencies overwrite lower', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const dependencies = ['jest@25.0.0'];
      const classForTesting = new addDependencies(
        dependencies,
        addDependencies.CONSTANTS.OPTIONAL_DEPENDENCIES,
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
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });

  test('with peer dependencies overwrite', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const dependencies = ['jest@26.0.1'];
      const classForTesting = new addDependencies(
        dependencies,
        addDependencies.CONSTANTS.PEER_DEPENDENCIES,
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
      runAndVerify(
        done,
        classForTesting,
        packageJson,
        testExpectObject,
        expectedJsonOverrides
      ).then();
    });
  });
});
