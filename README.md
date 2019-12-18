# Pattern-Library

> The official Pattern Library of Emory Libraries

## Table of Contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Contributing](#contributing)
* [Grunt](#grunt)
* [Usage](#usage)


## Prerequisites
This Pattern Library uses [Pattern Lab 2, Node Version, Grunt Edition](https://github.com/pattern-lab/edition-node-grunt), which requires [Node](https://nodejs.org) `>=5.0` for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [Grunt](https://gruntjs.com/) `^1.0.4` to run automated tasks and build the Pattern Lab instance. Additionally, this Pattern Library utilizes tools like [Plop](https://plopjs.com/) to help generate files and [Browserify](http://browserify.org/) to help write modular JS that can be bundled for use in the browser. A basic understanding of these tools is recommended.


## Installation
Prior to installation, ensure that all prerequisites have been met. Then, to install this project on your system:

1. Download and unzip the compressed package, or clone the repo using:

```
git clone https://github.com/emory-libraries/Pattern-Library
```

2. Then `cd` to your project's folder in a terminal and install all package dependencies with:

```
npm install
```


## Contributing
Before contributing to the Pattern Library, make sure all [prerequisites](#prerequisites) have been met and that you've followed the [installation steps](#installation) to setup the project on your local machine. Here's everything else you'll need to know before getting started.

#### Pulling Dependencies
Our Pattern Library depends on files from other [Emory Libraries](https://github.com/emory-libraries) projects, such as the [Emory Libraries Sass Framework](https://github.com/emory-libraries/template-sass). These files can be pulled into the Pattern Library from other local repos on your system as needed using the [`grunt pull`](#grunt-pull) command.

> Note, the `grunt pull` command has been preconfigured to pull in any files from other (local) repos that the Pattern Library integrates with. You must download or `git clone` these repos to your local machine in a location adjacent to your Pattern Library repo under the repo's default name in order for this to work.

#### Pushing Dependencies
Some files within our Pattern Library are utilized by other [Emory Libraries](https://github.com/emory-libraries) projects, such as the [Emory Libraries Style Guide](https://github.com/emory-libraries/style-guide-guide). These files can be pushed to other local repos on your system as needed using the [`grunt push`](#grunt-push) command.

> Note, the `grunt push` command has been preconfigured to push out any files to other (local) repos that require some integration with the Pattern Library. You must download or `git clone` these repos to your local machine in a location adjacent to your Pattern Library repo under the repo's default name in order for this to work.

#### Committing Changes
The `dev` branch is the default branch for committing changes made during development. Committing changes to the `master` and/or `qa` branch(es) directly is not recommended. In order to merge any changes made to the `dev` branch back into the other branches, a pull request should be opened in order to allow for your commits to be reviewed and approved before merging.


#### Scaffolding Patterns
To quickly scaffold new patterns and/or pattern groups, simply use the [`grunt plop`](#grunt-plop) command. This command uses our [Plop](#about-plop) templates to quickly generate the files you need. You can also use this command to call a specific generator directly by passing the desired generator's name into the Grunt task as an argument, like `grunt plop:pattern` or `grunt plop:group`.

#### Automating Tasks
This project uses [Grunt](https://gruntjs.com/) to help automate common development tasks. For a complete list of built-in Grunt tasks that are available to you, refer to the [Grunt][#grunt] section of this documentation.

#### Exporting Patterns
Individual pattern definitions can be exported using the custom [`grunt export`](#grunt-export) task by passing in the Pattern Lab ID (PLID) of the pattern you would like to export, like `grunt export:atoms-button`. If no PLID is given, then all patterns will be exported. The pattern and its asset files (SCSS, JS, etc.) will be exported into their own pattern-specific folders and will include the rendered and markup-only HTML versions of the pattern. These patterns will be exported to the `patternExportDirectory` location set in your `patternlab-config.json`.

> Note, using the [`grunt export`](#grunt-export) task for exporting patterns bypasses Pattern Lab's built-in method for exporting patterns via its CLI. Therefore, you can ignore the `patternExportPatternPartials` option in the `pattern-config.json` altogether as it's no longer needed using this approach.


#### Additional Resources
To learn more about the various tools that we use to build and maintain our Pattern Library, check out the resources below.

##### About Pattern Lab
[Pattern Lab](https://patternlab.io/) allows you to create atomic design systems and website style guides from the ground up. For more information on the Node version and/or Grunt edition of Pattern Lab, read the [Pattern Lab Docs](https://patternlab.io/docs), check out the [Grunt Edition](https://github.com/pattern-lab/edition-node-grunt) project on Github, and/or get more details on the [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node). For demos and other resources, visit to the [Pattern Lab Resource Center](https://patternlab.io/resources.html).

##### About Handlebars
[Handlebars](https://handlebarsjs.com/) is a semantic templating language that Pattern Lab uses to bind JSON data with template files in order to generate static HTML. For a complete guide on how to use Handlebars, read the [Handlebars documentation](https://handlebarsjs.com/), refer to the [Handlebars API](https://handlebarsjs.com/reference.html), and/or check out the [Handlebars project on GitHub](https://github.com/wycats/handlebars.js#differences-between-handlebarsjs-and-mustache).

##### About Plop
[Plop](https://plopjs.com/) is a micro-generator that we use to help quickly scaffold new pieces of our Pattern Library. For more information on what Plop is and how to use it, read through the [Plop documentation](https://plopjs.com/documentation) or refer to [Plop repo on Github](https://github.com/amwmedia/plop). To learn more about generating files with Plop, customizing it to meet your needs, and/or extending its functionality, you can also check out the the [Plopfile API](https://plopjs.com/documentation/#plopfile-api) and see what an [example Plopfile](https://github.com/amwmedia/plop/tree/master/example) looks like.


## Grunt
Grunt has been preconfigured with a number of useful tasks. The most commonly used Grunt tasks are [`grunt dev`](#grunt-dev) for developing the Pattern Library and [`grunt dist`](#grunt-dist) for generating production-ready files for distribution. The default Grunt task is set to [`grunt dev`](#grunt-dev).


##### `grunt build:dev`

Compiles all asset files and builds an instance of the Pattern Library for development.

**Subtasks**

| Subtask                 | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `build:dev:patternlab`  | Builds only the Pattern Library to static HTML.                 |
| `build:dev:scss`        | Compiles only SCSS asset files to CSS.                          |
| `build:dev:js`          | Compiles only JS assets into a single bundle.                   |


##### `grunt build:dist`

Compiles all asset files and builds an instance of the Pattern Library for production.

**Subtasks**

| Subtask                 | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `build:dist:patternlab` | Builds only the Pattern Library to static HTML.                 |
| `build:dist:scss`       | Compiles only SCSS asset files to CSS.                          |
| `build:dist:js`         | Compiles only JS assets into a single bundle.                   |


##### `grunt css`

Generates pattern-specific CSS files for all patterns that can be displayed alongside that pattern's information within the Pattern Library.


##### `grunt default`

Acts an alias for [`grunt dev`]({#grunt-dev). This can be used as either `grunt default` or simply `grunt`.


##### `grunt deploy`

Generates production-ready files for distribution (like [`grunt dist`](#grunt-dist)), then deploys them to the live Pattern Library site and targeted production server. Configurations for the production and WebDav servers should be set in a `secret.json` file. Refer to the `secret.example.json` file as a starting point.


##### `grunt dev`

Builds the Pattern Library, listens for changes during development, and enables live previewing of changes in the browser.

**Subtasks**

| Subtask         | Description                                                             |
|-----------------|-------------------------------------------------------------------------|
| `dev:startup`   | Runs an initial build and forces any active browser windows to reload.  |
| `dev:buildonly` | Runs an initial build only without running any subsequent watch tasks.  |


##### `grunt dist`

Compiles assets into production-ready files for distribution.


##### `grunt docs`

Generates the `README.md` and listens for changes made to the documentation in order to regenerate it as needed.


##### `grunt export`

Exports a single pattern with its assets and/or all patterns with their respective assets. To export a single pattern, pass the pattern's Pattern Lab ID (PLID) (i.e., `atoms-button`) into the grunt task as an argument.

**Example**

```
grunt export:atoms-button
```


##### `grunt map`

Retrieves place data from the [Google Places API](https://developers.google.com/places/web-service/intro) for use when rendering maps. Use of this command requires that you setup an `env.json` file at the project's root and include a Google Places API key (`GOOGLE_PLACES_API.key`). The retrieved data is saved to `src/_data/map.json`. Any existing data within `map.json` will be overwritten with the newly retrieve, up-to-date information. **It is not likely that you will need to use this task unless additional data for new places is needed.**

> Refer to the `map.default.json` file for minimum field requirements when adding new places to the `map.json` file. Place IDs for newly added places can be found by using the [Place ID Finder](https://developers.google.com/places/place-id) tool provided by Google.


##### `grunt patternlab`

Runs the Pattern Lab core processor to spawn an instance of our Pattern Library.

**Subtasks**

| Subtask               | Description                                                             |
|-----------------------|-------------------------------------------------------------------------|
| `patternlab:build`    | Compiles the patterns and front-end UI to a previewable static site.    |
| `patternlab:version`  | Outputs the Pattern Lab version that's being used.                      |
| `patternlab:patternsonly`     | Compiles only the patterns to static HTML.                      |
| `patternlab:liststarterkits`  | Returns a URL to a list of available Pattern Lab starter kits.  |
| `patternlab:loadstarterkits`  | Loads a starterkit into the project.                            |
| `patternlab:help`     | Provides more information about Pattern Lab and its CLI.                |


##### `grunt pull`

Pulls in files from other repos that feed into the Pattern Library. Current dependencies for our Pattern Library include our [Emory Libraries Sass Framework](https://github.com/emory-libraries/template-sass). Note that in order for this task to work, you will need to download or `git clone` the repo(s) to your local machine into an adjacent directory under the repo's default name. After performing a `grunt pull`, you'll want to `git commit` these pulled files in the Pattern Library repo.


##### `grunt push`

Pushes out selected files from our Pattern Library repo to other repose that utilitize these files. Current dependencies for our Pattern Library include our [Emory Libraries Style Guide](https://github.com/emory-libraries/style-guide-guide). Note that in order for this task to work, you will need to download or `git clone` the repo(s) to your local machine into an adjacent directory under the repo's default name. After performing a `grunt push`, you'll want to `git commit` these pulled files in the other repo(s).


##### `grunt release`

Generates production-ready files for distribution and deploys them (like [`grunt deploy`](#grunt-deploy), and creates a new tagged release on GitHub.


##### `grunt serve`

Spins up a PHP-enabled server that allows previewing of the Pattern Library in real-time during development.


##### `grunt status`

"Updates a given pattern's status or enables batch dumping and/or updating of all pattern statuses using `export` and `import` subtasks, respectively. A `pattern-status.json` file is used when exporting and/or importing pattern statuses. To update the status of a single pattern, pass the pattern's Pattern Lab ID (PLID) (i.e., `atoms-button`) into the grunt task as an argument.

**Example**

```
grunt status:export:atoms-button
```

**Subtasks**

| Subtask         | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `status:export` | Performs a bulk dump of all pattern statuses into `pattern-status.json`.    |
| `status:import` | Performs a bulk update of all pattern statuses in `pattern-statuses.json`.  |


##### `grunt webdav`

Uploads files to the production web server via WebDAV. Configurations for the WebDAV server should be set in a `secret.json` file. Refer to the `secret.example.json` file as a starting point.


## Usage
There are three main ways to deploy this Pattern Library across Emory Libraries' websites and/or applications. Refer to the guidelines below that pertain to your specific use case.

#### Using Distributed Files
For projects where you have full control over the project's structure and wish to deploy the Pattern Library, you can deploy this Pattern Library through the use of our distributed files. These files consist of the CSS, JS, and other asset files that make up our design system, and they can be imported, included, and/or otherwise loaded directly into your website or application for immediate use. For the most recent version of our distributed files, you can refer to our [Pattern Library](https://template.library.emory.edu/styleguide/patternlibrary/current) and optionally make use of our [latest deployed release](https://template.library.emory.edu/styleguide/patternlibrary/latest). Alternatively, you can utilize our [`grunt dist`](#grunt-dist) task to generate your own version of our distribution files.

#### Using Source Files
For projects where you have full control over your project's structure but may not need our entire library of patterns, you can make use of our Pattern Library's source files. More specifically, you can utilize the pattern definitions directly, which can be found in `src/_patterns`. These files consist of the raw pattern files (`.hbs`) and their respective assets (`.scss`, `.js`, `.php`, etc.). To integrate our source files into your website or application, you can easily [export any of our patterns](#exporting-patterns).

#### Referring to the Patterns
For all projects where you have limited to no control over the project's structure (i.e., when working with vendor products), you can deploy our Pattern Library by simply referring to our patterns and incorporating them into your website and/or application as closely as possible. *More information on best practices for using this approach, and other helpful information about our design system, please contact the LTDS web team.*