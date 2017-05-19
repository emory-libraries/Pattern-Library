# Emory Libraries Pattern Library

This pattern library is built using [Pattern Lab 2 Standard Edition for Mustache](https://github.com/pattern-lab/patternlab-php). It contains the source folder for Pattern Lab which includes the mustache files, Sass files and CSS (dependent on Bourbon and Neat), and styles for the pattern lab itself.

## Installation

* In the command line, at the project root, enter 'npm install' to install node dependencies.

## Development
* To generate the site once during developement, simply enter 'grunt'.
* To put the pattern library into a watch state while developing, enter 'grunt watch' and set it to watch, enter 'grunt'. This will output expanded CSS with source maps. (Entering 'grunt dev' will do the same, but without the watch state.)

## Generate a Tagged Production Release
To generate production CSS for distribution:
1. Update the version number of the release in the package.json file. Refer to semver.org for versioning conventions.
* Generate a compressed (i.e. - minified) CSS without source maps: 'grunt release'.
* Generate a git tag release and push it up to the remote repository: 'grunt git-tag'.
