#!/usr/bin/env node

const fs = require('fs');
const npmRun = require('npm-run');
const semver = require('semver');

class NpmAddDependencies {
  constructor() {
    this.result = {};
    this.dependencies = [];
    this.target = null;
    this.overwrite = true;

    console.log('This script adds dependencies (latest versions) into the package.json file without installing them\n');

    process.argv.forEach((val, index) => {
      if (val && index !== 0 && index !== 1) {
        switch (val) {
          case '--dev':
          case '--peer':
          case '--bundled':
          case '--optional': {
            this.target = val.substring(2);
            break;
          }
          case '--no-overwrite': {
            this.overwrite = false;
            break;
          }
          default: {
            if (!/--/.test(val)) {
              this.dependencies.push(val);
            }
            break;
          }
        }
      }
    });

    this.addDependencies()
      .then(this.saveToPackage.bind(this))
      .catch(console.error);
  }

  addDependencies() {
    if (this.dependencies.length === 0) {
      console.error('No dependencies passed.');
      process.exit(1);
    }

    console.log(`Adding dependencies to '${this.getTargetName()}'...`);

    return Promise.all(this.dependencies.map((dep) => {
      return this.runNpmShow(dep);
    }));
  };

  runNpmShow(dep) {

    if (!dep.includes('@')) {
      return this.runNpmShowDistTags(dep);
    } else {
      return this.runNpmShowVersions(dep);
    }
  }

  runNpmShowDistTags(dep) {
    return new Promise((resolve) => {
      npmRun.exec(`npm show ${dep} dist-tags`, (err, stdout) => {
        if (!err) {
          const parsed = stdout.match(/latest: '(.*?)'/i);

          if (!parsed || undefined === parsed[1]) {
            console.error(`Could not obtain the latest version for: ${dep}. Skip.`);
          } else {
            this.result[dep] = `^${parsed[1]}`;

            console.log(`Processed: ${dep}, latest version: ${parsed[1]}`);
          }
        } else {
          console.error(`Could not fetch version info for: ${dep}. Skip.`);
        }

        resolve();
      });
    });
  }

  runNpmShowVersions(dep) {
    const [depName, depVersion] = dep.split('@');
    const depRange = semver.validRange(depVersion);

    const specifiedVersions = depRange.replace(/[~^<>=]+/g, '').split(' ');
    let operators = depRange.match(/[~^<>=]+/g);
    if (!operators) {
      operators = ['==='];
    }

    return new Promise((resolve) => {
      npmRun.exec(`npm show ${depName} versions`, (err, stdout) => {
        if (!err) {
          const versions = JSON.parse(stdout.replace(/'/g, '"'));
          if (operators.length === 1) {
            for (let i=0; i<versions.length; i++) {
              if (semver.cmp(versions[i], operators[0], specifiedVersions[0])) {
                this.result[depName] = `${depVersion}`;
                break;
              }
            }
          } else {
            for (let i=0; i<versions.length; i++) {
              if (
                semver.cmp(versions[i], operators[0], specifiedVersions[0]) &&
                semver.cmp(versions[i], operators[1], specifiedVersions[1])
              ) {
                this.result[depName] = `${depVersion}`;
                break;
              }
            }
          }

          if (undefined === this.result[depName]) {
            console.error(`Could not obtain the specified version for: ${depName}. Skip.`);
          } else {
            console.log(`Processed: ${depName}, specified version: ${depVersion}`);
          }
        } else {
          console.error(`Could not fetch version info for: ${depName}. Skip.`);
        }

        resolve();
      });
    });
  }

  getTargetName() {
    switch (this.target) {
      case 'dev': return 'devDependencies';
      case 'peer': return 'peerDependencies';
      case 'bundled': return 'bundledDependencies';
      case 'optional': return 'optionalDependencies';
      default: return 'dependencies';
    }
  }

  saveToPackage() {
    this.readFromFile('package.json').then(async (data) => {
      let json;

      try {
        json = JSON.parse(data);
      } catch (e) {
        console.error('Could not parse package.json. Stop.');
        process.exit(1);
      }

      if (this.overwrite) {
        this.result = Object.assign(json[this.getTargetName()] || {}, this.result);
      } else {
        this.result = Object.assign(this.result, json[this.getTargetName()] || {});
      }

      this.result = Object.keys(this.result).sort().reduce((res, key) => {
        res[key] = this.result[key];

        return res;
      }, {});

      json[this.getTargetName()] = this.result;

      await this.writeToFile('package.json', JSON.stringify(json, null, 2));

      console.log('Done.');
    });
  }

  readFromFile(filePath) {
    return new Promise((resolve) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error('Could not read from package.json. Stop.');
          process.exit(1);
        }

        resolve(data.toString());
      });
    });
  }

  writeToFile(filePath, fileContent) {
    return new Promise((resolve) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error('Could not write to package.json. Stop.');
          process.exit(1);
        }

        resolve();
      });
    });
  };
}

new NpmAddDependencies();
