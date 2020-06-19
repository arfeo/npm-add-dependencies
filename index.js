#!/usr/bin/env node
const AddDependencies = require('./lib/AddDependencies');

console.log('\x1b[33m%s\x1b[0m', 'This script adds dependencies (latest or specified versions) to the package.json file skipping the installation process.');

const app = new AddDependencies();

app.addDependencies().then(app.saveToPackage.bind(app)).catch((error) => {
  console.error('\x1b[31m%s\x1b[0m', error);
  process.exit(1);
});
