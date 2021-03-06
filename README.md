# roof-on-fire

## Install
Install the dependencies:

```bash
npm install
```

## Usage
Run the following to start :
```bash
npm run prestart
```
and then
```bash
npm run start-dev
```
This will start the application with hot-reload so you can instantly start developing your application.

DONT FORGET KILL PROCESS Electron FROM TASK MANAGER


This two for processes started **simultaneously** in different console tabs:

```bash
npm run start-renderer-dev
npm run start-main-dev
```
## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

This command create installation package.
```bash
npm run dist
```

This will create a installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
npm run dist -- -mwl
```

## Husky and Prettier
This project comes with both Husky and Prettier setup to ensure a consistent code style. 

To change the code style, you can change the configuration in `.prettierrc`. 

In case you want to get rid of this, you can removing the following from `package.json`:

1. Remove `precommit` from the `scripts` section
1. Remove the `lint-staged` section
1. Remove `lint-staged`, `prettier`, `eslint-config-prettier`, and `husky` from the `devDependencies`

Also remove all mentions of Prettier from the `extends` section in `.eslintrc.json`.
