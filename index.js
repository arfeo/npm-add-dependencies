#!/usr/bin/env node

const fs = require('fs');
const npmRun = require('npm-run');

class NpmAddDependencies {
  constructor() {
    this.result = {};
    this.dependencies = [];
    this.target = null;

    console.log('This script adds dependencies into the package.json file');
    console.log('skipping the installation process\n');

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

    console.log('Adding dependencies to', this.getTargetName(), '...');

    return Promise.all(this.dependencies.map((dep) => {
      return this.runNpmShow(dep);
    }));
  };

  runNpmShow(dep) {
    return new Promise((resolve) => {
      npmRun.exec(`npm show ${dep} dist-tags`, (err, stdout) => {
        if (!err) {
          const parsed = stdout.match(/latest: '(.*?)'/i);

          if (undefined !== parsed[1]) {
            this.result[dep] = `^${parsed[1]}`;

            console.error(`Processed: ${dep}, latest version: ${parsed[1]}`);
          }
        } else {
          console.error(`Could not fetch version info for: ${dep}. Skip.`);
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
