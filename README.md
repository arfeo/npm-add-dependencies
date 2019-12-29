# npm-add-dependencies

This script adds dependencies (latest or specified versions) to the package.json file skipping the installation process.

### Installation

```sh
$ npm install npm-add-dependencies [-g]
```

### Usage

Go to a directory with the target `package.json` and run

```sh
$ npm-add-dependencies <dependencies> [target] [--no-overwrite]
```

where `dependencies` is the list of dependencies divided by space, and `target` is one of the following:
* `--dev`/`--save-dev`/`-D` for `devDependencies`
* `--peer`/`--save-peer`/`-P` for `peerDependencies`
* `--optional`/`--save-optional`/`-O` for `optionalDependencies`

If no `target` argument passed, dependencies are written to `dependencies`.

Use `--no-overwrite` flag to prevent already existing packages in `package.json` from being overwritten.

Example:

```sh
$ npm-add-dependencies moment@2.0.0 react@16.8 redux eslint --dev
```
