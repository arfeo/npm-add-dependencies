# add-dependencies

This script adds dependencies (latest or specified versions) to the package.json file skipping the installation process.

### Installation

If not using with `npx` (see below):

```sh
$ npm install add-dependencies [-g]
```

### Usage

Run:

```sh
$ add-dependencies [package_file] <dependencies> [target] [--no-overwrite]
```

or with `npx`:

```sh
$ npx add-dependencies [package_file] <dependencies> [target] [--no-overwrite]
```

where `dependencies` is the list of dependencies divided by space, and `target` is one of the following:
* `--dev` / `--save-dev` / `-D` for `devDependencies`
* `--peer` / `--save-peer` / `-P` for `peerDependencies`
* `--optional` / `--save-optional` / `-O` for `optionalDependencies`

If no `target` argument passed, dependencies are written to `dependencies`.

If no `package_file` argument passed, the script searches for a `package.json` file within the current working directory.

Use `--no-overwrite` flag to prevent already existing packages in `package.json` from being overwritten.

Example:

```sh
$ add-dependencies /home/user/project/package.json moment@2.0.0 react@16.8 redux eslint --dev
```

or with `npx`:

```sh
$ npx add-dependencies /home/user/project/package.json moment@2.0.0 react@16.8 redux eslint --dev
```
