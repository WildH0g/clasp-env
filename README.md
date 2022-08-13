# Welcome to clasp-env 👋

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000)
![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)
[![Twitter: wildhogsm](https://img.shields.io/twitter/follow/wildhogsm.svg?style=social)](https://twitter.com/wildhogsm)
[![GitHub](https://img.shields.io/github/followers/WildH0g?style=social)](https://www.github.com/WildH0g)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-follow-blue)](https://www.linkedin.com/in/dmitrykostyuk/)
[![Wurkspaces.dev](https://img.shields.io/badge/Wurkspaces.dev-Hire%20Me-orange)](https://wurkspaces.dev/contact)

> CLI clasp environment switcher 🏠 [Homepage](https://github.com/WildH0g/clasp-env#readme)

## Usage

Run the following command (without prior installation):

```sh
npx clasp-env --folder <path_to_folder> --scriptId <apps_script_project_id>
```

## Run Tests

```sh
npm run test
```

## Project Description

### The Strategy

`clasp-env` is a command-line utility that allows you to switch between different Google Apps Script environments. When you write your code locally and deploy your Google Apps Script code with [`clasp`](https://www.npmjs.com/package/@google/clasp), it creates a `.clasp.json` file that contains the `scriptId` property. This tells clasp which project it needs to push the code to.

When working in a team and/or with a client, you want to have multiple environments. At minimum, you probably want a dev environment (or multiple ones) in which you are working, and a test environment in which the client or your team can run acceptance tests before production. Of course, they must both be separate from the production environment.

`clasp-env` allows you to update the `scriptId` property in the `.clasp.json` file so that the code gets pushed to the intented project environment. The `<path>` indicates the path to the folder where the `.clasp.json` file is located.

It takes two arguments, `<path_to_folder>` and `<apps_script_project_id>`, both of which are mandatory. It then looks up the .clasp.json file in the folder and sets its scriptId to the one specified in the parameter.

### Include in `package.json` Scripts

You don’t want to type out the folder paths and IDs every time you want to change the scripts, so it’s best to save them in the `package.json`'s `scripts` property like so:

```json
{
  "scripts": {
    "clasp/dev": "npx clasp-env --folder <path_to_folder> --scriptId <dev_apps_script_project_id>",
    "clasp/prod": "npx clasp-env --folder <path_to_folder> --scriptId <prod_apps_script_project_id>"
  }
}
```

To switch to the prod environment, simply run `npm run clasp/prod` in the terminal and the `scriptId` property will be updated.

It’s also a good idea to combine `clasp-env` with the `clasp push` command. Accordingly, as soon as you switch environments, `clasp` will begin pushing your code to the project. The `-w` option at the end stands for “watch,” meaning that `clasp` will push your code every time you save a file:

```json
{
  "scripts": {
    "push/dev": "npx clasp-env --folder <path_to_folder> --scriptId <dev_apps_script_project_id> && cd <path_to_folder> && clasp push -w",
    "push/prod": "npx clasp-env --folder <path_to_folder> --scriptId <prod_apps_script_project_id> && cd <path_to_folder> && clasp push -w"
  }
}
```

To switch to the prod environment and push your code there, run `npm run push/prod` in the terminal.

Note that the folder must be a relative path from the project root. A typical project structure may look something like this:

```sh
my-app/
├─ node_modules/
├─ gas/
│  ├─ Code.js
│  ├─ appsscript.json
│  ├─ .clasp.json
├─ src/
│  ├─ index.js
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
```

The Google Apps Script files, including `.clasp.json`, are in the `gas` folder; thus, the command should look like this:

```sh
npx clasp-env --folder gas –-scriptId 1k1bnhRoqrESBvS95ZJncRYpsgSdM4anxwo3yI2Egs_Q
```

### .gitignore

If you use git with your projects, you’ll also want to add `.clasp.json` files to `.gitignore` so that it’s not considered a change in the source code every time you switch environments. You can accomplish this by adding this line to the `.gitignore` file: `**/.clasp.json`

## Related Articles

- [How to Write Google Apps Script Code Locally in VS Code and Deploy It With clasp](https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018)
- [The ULTIMATE Guide to NPM Modules in Google Apps Script](https://medium.com/geekculture/the-ultimate-guide-to-npm-modules-in-google-apps-script-a84545c3f57c)

## Author

👤 **Dmitry Kostyuk**

- Website: <https://www.wurkspaces.dev>
- LinkedIn: [@dmitrykostyuk](https://linkedin.com/in/dmitrykostyuk)
- Medium: [@dmitry-kostyuk](https://medium.com/@dmitry-kostyuk)
- Github: [@WildH0g](https://github.com/WildH0g)
- Stack Overflow: [Dmitry Kostyuk](https://stackoverflow.com/users/13229211/dmitry-kostyuk)
- Twitter: [@wildhogsm](https://twitter.com/wildhogsm)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/WildH0g/clasp-env/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
