# add-dependencies

This script adds dependencies (latest or specified versions) to the package.json file skipping the installation process.

### Installation

If not using with `npx` (see below), you can install with:

```sh
$ npm install add-dependencies [-g]
```

### Usage

Run:

```sh
$ add-dependencies [packageFilePath] <dependencies> [target] [--no-overwrite]
```

or with `npx`:

```sh
$ npx add-dependencies [packageFilePath] <dependencies> [target] [--no-overwrite]
```

where `dependencies` is the list of dependencies divided by space, and `target` is one of the following:
* `--dev` / `--save-dev` / `-D` for `devDependencies`
* `--peer` / `--save-peer` / `-P` for `peerDependencies`
* `--optional` / `--save-optional` / `-O` for `optionalDependencies`

If no `target` argument passed, dependencies are written to `dependencies`.

If no `packageFilePath` argument passed, dependencies are written to the default of `./package.json`, i.e `/some/dir/from/root/package.json` or `../some/relative/path/package.json`

Use `--no-overwrite` flag to prevent already existing packages in `package.json` from being overwritten.

Example:

```sh
$ add-dependencies moment@2.0.0 react@16.8 redux eslint --dev
```

or with `npx`:

```sh
$ npx add-dependencies /home/user/project/package.json moment@2.0.0 react@16.8 redux eslint --dev
```
