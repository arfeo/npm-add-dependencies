#!/usr/bin/env node
const NpmAddDependencies = require('./lib/NpmAddDependencies');

console.log('\x1b[33m%s\x1b[0m', 'This script adds dependencies (latest or specified versions) to the package.json file without installing them');

const app = new NpmAddDependencies();

app.addDependencies().then(app.saveToPackage.bind(app)).catch((error) => {
  console.error('\x1b[31m%s\x1b[0m', error);
  process.exit(1);
});
