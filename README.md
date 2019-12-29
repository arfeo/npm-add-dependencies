# add-dependencies

This script adds dependencies (latest or specified versions) to the package.json file skipping the installation process.

Installing a dependency can have dangerous side effects, [according to `npm`](https://blog.npmjs.org/post/141702881055/package-install-scripts-vulnerability):
> it is possible for a maliciously-written npm package, when installed, to execute a script.

It's safer and faster to add dependencies to `package.json` with this tool, and then only actually install them within a Docker container, for example, with [`docked-node`](https://github.com/AndersDJohnson/docked-node).

### Installation

If not using with `npx` (see below), you can install with:

```sh
$ npm install add-dependencies [-g]
```

### Usage

Go to a directory with the target `package.json` and run:

```sh
$ add-dependencies <dependencies> [target] [--no-overwrite]
```

or with `npx`:

```sh
$ npx add-dependencies <dependencies> [target] [--no-overwrite]
```

where `dependencies` is the list of dependencies divided by space, and `target` is one of the following:
* `--dev` / `--save-dev` / `-D` for `devDependencies`
* `--peer` / `--save-peer` / `-P` for `peerDependencies`
* `--optional` / `--save-optional` / `-O` for `optionalDependencies`

If no `target` argument passed, dependencies are written to `dependencies`.

Use `--no-overwrite` flag to prevent already existing packages in `package.json` from being overwritten.

Example:

```sh
$ add-dependencies moment@2.0.0 react@16.8 redux eslint --dev
```

or with `npx`:

```sh
$ npx add-dependencies moment@2.0.0 react@16.8 redux eslint --dev
```
