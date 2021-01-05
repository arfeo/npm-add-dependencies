const argv = require('mock-argv');
const addDependencies = require('../../../index');
const {
  generateRandomFilename,
  generateDefaultPackageJson,
} = require('../../__mocks__/utils');
const Files = require('../../../lib/Files');

describe('test run()', () => {
  test('This doesnt need to be tested as its tested by the index and cli-index tests', () => {
    expect(true).toBeTruthy();
  });
});

describe('test addDependencies()', () => {
  test('None', (done) => {
    const npmAdd = new addDependencies();
    npmAdd.addDependencies().then(() => {
      expect(npmAdd.result).toEqual({});
      expect(npmAdd.target).toEqual(addDependencies.CONSTANTS.DEPENDENCIES);
      expect(npmAdd.overwrite).toEqual(true);
      expect(npmAdd.packageFilePath).toEqual('./package.json');
      expect(npmAdd.dependencies).toEqual([]);
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        'No dependencies passed. Stop.'
      );
      expect(process.exit).toHaveBeenCalledWith(1);
      done();
    });
  });

  test('-D', (done) => {
    argv(['-D'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.DEV_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--save-dev', (done) => {
    argv(['--save-dev'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.DEV_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--dev', (done) => {
    argv(['--dev'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.DEV_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });

  test('-P', (done) => {
    argv(['-P'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.PEER_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--save-peer', (done) => {
    argv(['--save-peer'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.PEER_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--peer', (done) => {
    argv(['--peer'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.PEER_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });

  test('-O', (done) => {
    argv(['-O'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.OPTIONAL_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--save-optional', (done) => {
    argv(['--save-optional'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.OPTIONAL_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
  test('--optional', (done) => {
    argv(['--optional'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.target).toEqual(
          addDependencies.CONSTANTS.OPTIONAL_DEPENDENCIES
        );
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });

  test('--no-overwrite', (done) => {
    argv(['--no-overwrite'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.overwrite).toEqual(false);
        expect(npmAdd.target).toEqual(addDependencies.CONSTANTS.DEPENDENCIES);
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });

  test('package.json', (done) => {
    argv(['../../../package.json'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.packageFilePath).toEqual('../../../package.json');
        expect(npmAdd.target).toEqual(addDependencies.CONSTANTS.DEPENDENCIES);
        expect(npmAdd.result).toEqual({});
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.dependencies).toEqual([]);
        expect(console.error).toBeCalledWith(
          '\x1b[31m%s\x1b[0m',
          'No dependencies passed. Stop.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
        done();
      });
    });
  });

  test('some packages', (done) => {
    const deps = ['jquery', 'semver@^6.3.0', 'npm-run@~5.0.1'];
    argv(['jquery', 'semver@^6.3.0', 'npm-run@~5.0.1'], () => {
      const npmAdd = new addDependencies();
      npmAdd.addDependencies().then(() => {
        expect(npmAdd.dependencies).toEqual(deps);
        expect(npmAdd.target).toEqual(addDependencies.CONSTANTS.DEPENDENCIES);
        expect(npmAdd.result).toEqual({
          jquery: '^3.5.1',
          'npm-run': '~5.0.1',
          semver: '^6.3.0',
        });
        expect(npmAdd.overwrite).toEqual(true);
        expect(npmAdd.packageFilePath).toEqual('./package.json');
        expect(console.log).toBeCalledWith(
          `Adding packages to '${npmAdd.target}'...`
        );
        done();
      });
    });
  });
});

describe('test runNpmShow()', () => {
  test('no dep', (done) => {
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow().then(() => {
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        `No Dependency Provided to runNpmShow()`
      );
      done();
    });
  });

  test('non existent dep', (done) => {
    const depName = 'dffdsfdsdsfzfsfafdsfdsafdsadfsa';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow('dffdsfdsdsfzfsfafdsfdsafdsadfsa').then(() => {
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        `Could not fetch version info for: ${depName}. Skip.`
      );
      done();
    });
  });

  test('non existent dep with version', (done) => {
    const depName = 'dffdsfdsdsfzfsfafdsfdsafdsadfsa';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@1.2.3`).then(() => {
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        `Could not fetch version info for: ${depName}. Skip.`
      );
      done();
    });
  });

  test('dep no version', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(depName).then(() => {
      expect(console.log).toBeCalledWith(
        expect.stringContaining(`Processed: ${depName}, latest version:`)
      );
      done();
    });
  });

  test('dep with @', (done) => {
    const depName = 'jquery';
    const version = '3.5.1';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@3.5.1`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: ${version}`
      );
      done();
    });
  });

  test('dep with @ invalid version', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@1.2.3`).then(() => {
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        `Could not obtain the specified version for: ${depName}. Skip.`
      );
      done();
    });
  });

  test('dep with ^', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@^2.0.0`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: ^2.0.0`
      );
      done();
    });
  });

  test('dep with <', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@<2.2.4`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: <2.2.4`
      );
      done();
    });
  });

  test('dep with <=', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@<=2.2.4`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: <=2.2.4`
      );
      done();
    });
  });

  test('dep with >', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@>2.2.3`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: >2.2.3`
      );
      done();
    });
  });

  test('dep with >=', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@>=2.2.4`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: >=2.2.4`
      );
      done();
    });
  });

  test('dep with ~', (done) => {
    const depName = 'jquery';
    const npmAdd = new addDependencies();
    npmAdd.runNpmShow(`${depName}@~2.2.0`).then(() => {
      expect(console.log).toBeCalledWith(
        `Processed: ${depName}, specified version: ~2.2.0`
      );
      done();
    });
  });
});

describe('test saveToPackage()', () => {
  test('packageFilePath does not exist', (done) => {
    // generateRandomFilename().then((fileName) =>
    //   generateDefaultPackageJson().then((defaultPackageJson) =>
    //     Files.writeToFile(fileName, JSON.stringify(defaultPackageJson))
    //   )
    // );
    const npmAdd = new addDependencies();
    npmAdd.packageFilePath = 'asdsadasda/package.json';
    npmAdd.saveToPackage().then(() => {
      expect(console.error).toBeCalledWith(
        '\x1b[31m%s\x1b[0m',
        `Could not read from ${npmAdd.packageFilePath}. Stop.`
      );
      expect(process.exit).toHaveBeenCalledWith(1);
      done();
    });
  });

  test('not json', (done) => {
    generateRandomFilename().then((fileName) =>
      Files.writeToFile(fileName, 'i am random text').then(() => {
        const npmAdd = new addDependencies();
        npmAdd.packageFilePath = fileName;
        npmAdd.saveToPackage().then(() => {
          expect(console.error).toBeCalledWith(
            '\x1b[31m%s\x1b[0m',
            `Could not parse ${npmAdd.packageFilePath}. Stop.`
          );
          expect(process.exit).toHaveBeenCalledWith(1);
          done();
        });
      })
    );
  });

  test('json with no packages', (done) => {
    generateRandomFilename().then((fileName) =>
      generateDefaultPackageJson().then((defaultPackageJson) => {
        defaultPackageJson.dependencies = {};
        defaultPackageJson.devDependencies = {};
        defaultPackageJson.optionalDependencies = {};
        defaultPackageJson.peerDependencies = {};
        Files.writeToFile(fileName, JSON.stringify(defaultPackageJson)).then(
          () => {
            const npmAdd = new addDependencies();
            npmAdd.packageFilePath = fileName;
            npmAdd.result['jest'] = '26.0.0';
            const expectedJsonOverrides = {
              dependencies: {
                jest: '26.0.0',
              },
            };
            npmAdd.saveToPackage().then(() =>
              Files.readFromFile(fileName).then((jsonResult) => {
                const expectedJson = {
                  ...defaultPackageJson,
                  ...expectedJsonOverrides,
                };
                expect(JSON.parse(jsonResult)).toEqual(expectedJson);
                expect(console.log).toBeCalledWith(
                  '\x1b[32m%s\x1b[0m',
                  'Done.'
                );
                done();
              })
            );
          }
        );
      })
    );
  });

  test('json with packages and overwrite', (done) => {
    generateRandomFilename().then((fileName) =>
      generateDefaultPackageJson().then((defaultPackageJson) => {
        Files.writeToFile(fileName, JSON.stringify(defaultPackageJson)).then(
          () => {
            const npmAdd = new addDependencies();
            npmAdd.packageFilePath = fileName;
            npmAdd.result['jest'] = '26.0.1';
            const expectedJsonOverrides = {
              dependencies: {
                jest: '26.0.1',
              },
            };
            npmAdd.saveToPackage().then(() =>
              Files.readFromFile(fileName).then((jsonResult) => {
                const expectedJson = {
                  ...defaultPackageJson,
                  ...expectedJsonOverrides,
                };
                expect(JSON.parse(jsonResult)).toEqual(expectedJson);
                expect(console.log).toBeCalledWith(
                  '\x1b[32m%s\x1b[0m',
                  'Done.'
                );
                done();
              })
            );
          }
        );
      })
    );
  });

  test('json with packages no overwrite', (done) => {
    generateRandomFilename().then((fileName) =>
      generateDefaultPackageJson().then((defaultPackageJson) => {
        Files.writeToFile(fileName, JSON.stringify(defaultPackageJson)).then(
          () => {
            const npmAdd = new addDependencies();
            npmAdd.packageFilePath = fileName;
            npmAdd.overwrite = false;
            npmAdd.result['jest'] = '26.0.1';
            npmAdd.saveToPackage().then(() =>
              Files.readFromFile(fileName).then((jsonResult) => {
                expect(JSON.parse(jsonResult)).toEqual(defaultPackageJson);
                expect(console.log).toBeCalledWith(
                  '\x1b[32m%s\x1b[0m',
                  'Done.'
                );
                done();
              })
            );
          }
        );
      })
    );
  });
});

describe('test CONSTANTS()', () => {
  test('dependencies', () => {
    expect(addDependencies.CONSTANTS.DEPENDENCIES).toEqual('dependencies');
  });

  test('devDependencies', () => {
    expect(addDependencies.CONSTANTS.DEV_DEPENDENCIES).toEqual(
      'devDependencies'
    );
  });

  test('peerDependencies', () => {
    expect(addDependencies.CONSTANTS.PEER_DEPENDENCIES).toEqual(
      'peerDependencies'
    );
  });

  test('optionalDependencies', () => {
    expect(addDependencies.CONSTANTS.OPTIONAL_DEPENDENCIES).toEqual(
      'optionalDependencies'
    );
  });
});
