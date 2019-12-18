Grunt has been preconfigured with a number of useful tasks. The most commonly used Grunt tasks are [`grunt dev`](#grunt-dev) for developing the Pattern Library and [`grunt dist`](#grunt-dist) for generating production-ready files for distribution. The default Grunt task is set to [`grunt dev`](#grunt-dev).


#### `grunt build:dev`

Compiles all asset files and builds an instance of the Pattern Library for development.

**Subtasks**

| Subtask                 | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `build:dev:patternlab`  | Builds only the Pattern Library to static HTML.                 |
| `build:dev:scss`        | Compiles only SCSS asset files to CSS.                          |
| `build:dev:js`          | Compiles only JS assets into a single bundle.                   |


#### `grunt build:dist`

Compiles all asset files and builds an instance of the Pattern Library for production.

**Subtasks**

| Subtask                 | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `build:dist:patternlab` | Builds only the Pattern Library to static HTML.                 |
| `build:dist:scss`       | Compiles only SCSS asset files to CSS.                          |
| `build:dist:js`         | Compiles only JS assets into a single bundle.                   |


#### `grunt css`

Generates pattern-specific CSS files for all patterns that can be displayed alongside that pattern's information within the Pattern Library.


#### `grunt default`

Acts an alias for [`grunt dev`]({#grunt-dev). This can be used as either `grunt default` or simply `grunt`.


#### `grunt deploy`

Generates production-ready files for distribution (like [`grunt dist`](#grunt-dist)), then deploys them to the live Pattern Library site and targeted production server. Configurations for the production and WebDav servers should be set in a `secret.json` file. Refer to the `secret.example.json` file as a starting point.


#### `grunt dev`

Builds the Pattern Library, listens for changes during development, and enables live previewing of changes in the browser.

**Subtasks**

| Subtask         | Description                                                             |
|-----------------|-------------------------------------------------------------------------|
| `dev:startup`   | Runs an initial build and forces any active browser windows to reload.  |
| `dev:buildonly` | Runs an initial build only without running any subsequent watch tasks.  |


#### `grunt dist`

Compiles assets into production-ready files for distribution.


#### `grunt docs`

Generates the `README.md` and listens for changes made to the documentation in order to regenerate it as needed.


#### `grunt export`

Exports a single pattern with its assets and/or all patterns with their respective assets. To export a single pattern, pass the pattern's Pattern Lab ID (PLID) (i.e., `atoms-button`) into the grunt task as an argument.

**Example**

```
grunt export:atoms-button
```


#### `grunt map`

Retrieves place data from the [Google Places API]({%= link['google-places'] %}) for use when rendering maps. Use of this command requires that you setup an `env.json` file at the project's root and include a Google Places API key (`GOOGLE_PLACES_API.key`). The retrieved data is saved to `src/_data/map.json`. Any existing data within `map.json` will be overwritten with the newly retrieve, up-to-date information. **It is not likely that you will need to use this task unless additional data for new places is needed.**

> Refer to the `map.default.json` file for minimum field requirements when adding new places to the `map.json` file. Place IDs for newly added places can be found by using the [Place ID Finder]({%= link['google-place-id'] %}) tool provided by Google.


#### `grunt patternlab`

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


#### `grunt pull`

Pulls in files from other repos that feed into the Pattern Library. Current dependencies for our Pattern Library include our [Emory Libraries Sass Framework]({%= repo['template-sass'] %}). Note that in order for this task to work, you will need to download or `git clone` the repo(s) to your local machine into an adjacent directory under the repo's default name. After performing a `grunt pull`, you'll want to `git commit` these pulled files in the Pattern Library repo.


#### `grunt push`

Pushes out selected files from our Pattern Library repo to other repose that utilitize these files. Current dependencies for our Pattern Library include our [Emory Libraries Style Guide]({%= repo['style-guide-guide'] %}). Note that in order for this task to work, you will need to download or `git clone` the repo(s) to your local machine into an adjacent directory under the repo's default name. After performing a `grunt push`, you'll want to `git commit` these pulled files in the other repo(s).


#### `grunt release`

Generates production-ready files for distribution and deploys them (like [`grunt deploy`](#grunt-deploy), and creates a new tagged release on GitHub.


#### `grunt serve`

Spins up a PHP-enabled server that allows previewing of the Pattern Library in real-time during development.


#### `grunt status`

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


#### `grunt webdav`

Uploads files to the production web server via WebDAV. Configurations for the WebDAV server should be set in a `secret.json` file. Refer to the `secret.example.json` file as a starting point.
