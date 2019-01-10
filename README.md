# Pattern Library

> This is the official Pattern Library for Emory Libraries.

This Pattern Library uses Pattern Lab 2, Node Version, Grunt Edition.


## Prerequisites

Pattern Lab uses [Node](https://nodejs.org) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [grunt.js](http://gruntjs.com/) to run tasks and interface with the core library. Node version 4 or higher suffices. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm. It's also highly recommended that you [install grunt](http://gruntjs.com/getting-started) globally.


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


## Exporting Patterns

Pattern source files can be exported using the custom `grunt export` task by passing in the path of a pattern you would like to export, like `grunt export:10-atoms/01-buttons`. If the given pattern path matches a folder, all patterns within the folder will be exported. Otherwise, if the given pattern matches a set of pattern files, the pattern and its asset file will be exported. Note, all patterns will be exported to the `patternExportDirectory` location set in your `pattern-config.json` and will include any `.scss` and `.js` files.


## Using Pattern Lab

Pattern Lab allows you to create atomic design systems and website styleguides from the ground up. For more information on the Node version and/or Grunt edition of Pattern Lab, read the [Pattern Lab Docs](http://patternlab.io/docs), check out the [Grunt Edition](https://github.com/pattern-lab/edition-node-grunt) project on Github, and/or get more details on the [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node). For demos and other resoures, visit to the [Pattern Lab Resource Center](http://patternlab.io/resources.html).


## Using Handlebars

[Handlebars](https://handlebarsjs.com/) is a semantic templating language that Pattern Lab uses to bind JSON data with template files in order to generate static HTML. For a complete guide on how to use Handlebars, read the [Handlebars documentation](https://handlebarsjs.com), refer to the [Handlebars API](https://handlebarsjs.com/reference.html), and/or check out the [Handlebars project on GitHub](https://github.com/wycats/handlebars.js#differences-between-handlebarsjs-and-mustache).
