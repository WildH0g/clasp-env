# Welcome to clasp-env 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)]()
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)
[![Twitter: wildhogsm](https://img.shields.io/twitter/follow/wildhogsm.svg?style=social)](https://twitter.com/wildhogsm)

> CLI clasp environment switcher

### 🏠 [Homepage](https://github.com/WildH0g/clasp-env#readme)

## Usage

Run the following command (without prior installation):

```sh
npx clasp-env --folder <path> --scriptId <apps_script_project_id>
```

## Run Tests

```sh
npm run test
```

## Project Description

### The Strategy

`clasp-env` is a command-line utility that= allows you to switch between different Google Apps Script environments. When you write your code locally and deploy your Google Apps Script code with `clasp`, `clasp` creates a `.clasp.json` file that contains the `scriptId` property. This tells `clasp` what project it needs to push the code to.

When working in a team and/or with a client, you want to have multiple environments. You probably want at the minimum a dev environment that you're working in, a test environment for the client or your team to run some acceptance tests before production. And of course they both need to be separate from the production environment.

`clasp-env` allows you to update the `scriptId` property in the `.clasp.json` file so that the code gets pushed to the intented project environment. The `<path>` indicates the path to the folder where the `.clasp.json` file is located.

### Include in `package.json` Scripts

You don't want to be typing out the folder paths and IDs every time you want to change the scripts, so it's best to save them in the `package.json` scripts like so:

```json
{
  "scripts": {
    "clasp/dev": "npx clasp-env --folder <path_to_folder> --scriptId <dev_apps_script_project_id>",
    "clasp/prod": "npx clasp-env --folder <path_to_folder> --scriptId <prod_apps_script_project_id>"
  }
}
```

To switch to the prod environment simply run `npm run clasp/prod` and the `scriptId` property will get updated.

It's also a good idea to combine `clasp-env` with the clasp `clasp push` command, this way as soon as you switch environments, clasp will start pushing your code to the project. the `-w` option in the end stands for "watch", meaning that clasp will be pushing your code every time you save a file.

```json
{
  "scripts": {
    "push/dev": "npx clasp-env --folder <path_to_folder> --scriptId <dev_apps_script_project_id> && cd <path_to_folder> && clasp push -w",
    "push/prod": "npx clasp-env --folder <path_to_folder> --scriptId <prod_apps_script_project_id> && cd <path_to_folder> && clasp push -w"
  }
}
```

To switch to the prod environment and push your code there, run `npm run push/prod`.

If you use `git` with your projects, you also want to add `.clasp.json` files to `.gitignore` so that it's not considered a change in the sourced code every time you switch environments. You can do this by adding this line to the '.gitignore' file.

```sh
**/.clasp.json
```

### About `clasp`

For an in-depth tutorial about `clasp` read my article [How to Write Google Apps Script Code Locally in VS Code and Deploy It With clasp](https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018)

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
