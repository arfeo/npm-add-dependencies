# npm-add-dependencies

This script adds dependencies (latest versions) to the package.json file skipping the installation process.

### Installation

```
$ npm install npm-add-dependencies -g
```

### Usage

Go to a directory with the target `package.json` and run

```
$ npm-add-dependencies <dependencies> [target]
```

where `dependencies` is the list of dependencies divided by space, and `target` is one of the following:
* `--dev` for `devDependencies`
* `--peer` for `peerDependencies`
* `--bundled` for `bundledDependencies`
* `--optional` for `optionalDependencies`

If no `target` argument passed, dependencies are written to `dependencies`.


Use `--no-overwrite` to prevent already existing packages in `package.json` from being overwritten.    