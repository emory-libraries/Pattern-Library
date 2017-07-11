# Emory Libraries Pattern Library

We built this pattern library using [Pattern Lab 2 Standard Edition for Mustache](https://github.com/pattern-lab/patternlab-php).

It contains the source folder for Pattern Lab. The source folder includes:

*   the mustache files,
*   Sass files,
*   CSS (dependent on Bourbon and Neat),
*   and styles for Pattern Lab's presentation.

## Installation

*   In the command line, at the project root, enter 'npm install' to install node dependencies.

## Development

*   To generate the site once during developement, simply enter 'grunt'.
*   To put the pattern library into a watch state while developing, enter 'grunt watch'. This will output expanded CSS with source maps.

## Generate a Tagged Production Release

To generate production CSS for distribution:

1.  Update the version number of the release in the package.json file. Refer to semver.org for versioning conventions.
2.  Generate a compressed (i.e. - minified) CSS without source maps: 'grunt release'.
3.  Generate a git tag release and push it up to the remote repository: 'grunt git-tag'.