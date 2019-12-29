const npmRun = require('npm-run');
const semver = require('semver');
const Files = require('./Files');

class NpmAddDependencies {
  constructor() {
    this.result = {};
    this.dependencies = [];
    this.target = 'dependencies';
    this.overwrite = true;
  }

  addDependencies() {
    process.argv.forEach((val, index) => {
      if (val && index !== 0 && index !== 1) {
        switch (val) {
          case '--dev':
          case '--save-dev':
          case '-D': {
            this.target = 'devDependencies';
            break;
          }
          case '--peer':
          case '--save-peer':
          case '-P': {
            this.target = 'peerDependencies';
            break;
          }
          case '--optional':
          case '--save-optional':
          case '-O': {
            this.target = 'optionalDependencies';
            break;
          }
          case '--no-overwrite': {
            this.overwrite = false;
            break;
          }
          default: {
            if (!/^-/.test(val)) {
              this.dependencies.push(val);
            }
            break;
          }
        }
      }
    });

    if (this.dependencies.length === 0) {
      console.error('\x1b[31m%s\x1b[0m', 'No dependencies passed. Stop.');
      process.exit(1);
    }

    console.log(`Adding packages to '${this.target}'...`);

    return Promise.all(this.dependencies.map((dep) => this.runNpmShow(dep)));
  }

  runNpmShow(dep) {
    const depSplit = dep.split('@');
    const [depName, depVersion] = dep.charAt(0) !== '@' ? depSplit : [`@${depSplit[1]}`, depSplit[2]];

    if (depVersion) {
      const depRange = semver.validRange(depVersion) || '';
      const specifiedVersions = depRange.replace(/[~^<>=]+/g, '').split(' ');
      const operators = depRange.match(/[~^<>=]+/g) || ['=='];

      return new Promise((resolve) => {
        npmRun.exec(`npm show ${depName} versions`, (err, stdout) => {
          if (!err) {
            const depVersionsList = JSON.parse(stdout.replace(/'/g, '"'));

            try {
              for (const version of depVersionsList) {
                if (operators.length === 1) {
                  if (semver.cmp(version, operators[0], specifiedVersions[0])) {
                    this.result[depName] = `${depVersion}`;
                    break;
                  }
                } else if (operators.length > 1 && specifiedVersions.length > 1) {
                  if (semver.cmp(version, operators[0], specifiedVersions[0]) && semver.cmp(version, operators[1], specifiedVersions[1])) {
                    this.result[depName] = `${depVersion}`;
                    break;
                  }
                }
              }
            } catch (e) {}

            if (undefined === this.result[depName]) {
              console.error('\x1b[31m%s\x1b[0m', `Could not obtain the specified version for: ${depName}. Skip.`);
            } else {
              console.log(`Processed: ${depName}, specified version: ${depVersion}`);
            }
          } else {
            console.error('\x1b[31m%s\x1b[0m', `Could not fetch version info for: ${depName}. Skip.`);
          }

          return resolve();
        });
      });
    }

    return new Promise((resolve) => {
      npmRun.exec(`npm show ${depName} dist-tags`, (err, stdout) => {
        if (!err) {
          const parsed = stdout.match(/latest: '(.*?)'/i);

          if (!parsed || undefined === parsed[1]) {
            console.error('\x1b[31m%s\x1b[0m', `Could not obtain the latest version for: ${depName}. Skip.`);
          } else {
            this.result[depName] = `^${parsed[1]}`;

            console.log(`Processed: ${depName}, latest version: ${parsed[1]}`);
          }
        } else {
          console.error('\x1b[31m%s\x1b[0m', `Could not fetch version info for: ${depName}. Skip.`);
        }

        return resolve();
      });
    });
  }

  saveToPackage() {
    const packageFilePath = 'package.json';

    Files.readFromFile(packageFilePath).then(async (data) => {
      let json;

      try {
        json = JSON.parse(data);
      } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', `Could not parse ${packageFilePath}. Stop.`);
        process.exit(1);
      }

      this.result = this.overwrite
        ? Object.assign(json[this.target] || {}, this.result)
        : Object.assign(this.result, json[this.target] || {});

      this.result = Object.keys(this.result).sort().reduce((res, key) => {
        res[key] = this.result[key];

        return res;
      }, {});

      json[this.target] = this.result;

      Files.writeToFile(packageFilePath, JSON.stringify(json, null, 2)).then(() => {
        console.log('\x1b[32m%s\x1b[0m', 'Done.');
      }).catch(() => {
        console.error('\x1b[31m%s\x1b[0m', `Could not write to ${packageFilePath}. Stop.`);
        process.exit(1);
      });
    }).catch(() => {
      console.error('\x1b[31m%s\x1b[0m', `Could not read from ${packageFilePath}. Stop.`);
      process.exit(1);
    });
  }
}

module.exports = NpmAddDependencies;
