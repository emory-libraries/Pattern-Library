# Emory Libraries Pattern Library

This pattern library is built using [Pattern Lab 2 Standard Edition for Mustache](https://github.com/pattern-lab/patternlab-php). It contains the source folder for Pattern Lab which includes the mustache files, Sass files and CSS (dependent on Bourbon and Neat), and styles for the pattern lab itself.

## Installation and Generation

* In the command line, at the project root, enter 'npm install' to install node dependencies.
* To generate the site and set it to watch, enter 'grunt'. This will output expanded CSS with source maps. (Entering 'grunt dev' will do the same, but without the watch state.)
* To generate production CSS for distribution, enter 'grunt prod'. This will output compressed (i.e. - minified) CSS without source maps.
