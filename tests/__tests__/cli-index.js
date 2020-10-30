const {
  cliRunAndVerify,
  generateRandomFilename,
} = require('../__mocks__/utils');

describe('cli tests', () => {
  test('with dependencies with override', async (done) => {
    const expectedJsonOverrides = {
      dependencies: {
        jest: '26.0.1',
      },
    };
    generateRandomFilename().then((packageJson) => {
      const args = [packageJson, 'jest@26.0.1'];
      cliRunAndVerify(done, packageJson, args, expectedJsonOverrides);
    });
  });

  test('with no overwrite', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const expectedJsonOverrides = {};
      const args = [packageJson, 'jest@26.0.1', '--no-overwrite'];
      cliRunAndVerify(done, packageJson, args, expectedJsonOverrides);
    });
  });

  test('with dev dependencies overwrite with caret', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const expectedJsonOverrides = {
        devDependencies: {
          jest: '^26.0.1',
        },
      };
      const args = [packageJson, 'jest@^26.0.1', '--dev'];
      cliRunAndVerify(done, packageJson, args, expectedJsonOverrides);
    });
  });

  test('with optional dependencies overwrite lower', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const expectedJsonOverrides = {
        optionalDependencies: {
          jest: '25.0.0',
        },
      };
      const args = [packageJson, 'jest@25.0.0', '--optional'];
      cliRunAndVerify(done, packageJson, args, expectedJsonOverrides);
    });
  });

  test('with peer dependencies overwrite', async (done) => {
    generateRandomFilename().then((packageJson) => {
      const expectedJsonOverrides = {
        peerDependencies: {
          jest: '26.0.1',
        },
      };
      const args = [packageJson, 'jest@26.0.1', '--peer'];
      cliRunAndVerify(done, packageJson, args, expectedJsonOverrides);
    });
  });
});
