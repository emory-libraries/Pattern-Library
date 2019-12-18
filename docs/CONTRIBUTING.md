Before contributing to the Pattern Library, make sure all [prerequisites](#prerequisites) have been met and that you've followed the [installation steps](#installation) to setup the project on your local machine. Here's everything else you'll need to know before getting started.

### Pulling Dependencies
Our Pattern Library depends on files from other [Emory Libraries]({%= repo['emory-libraries'] %}) projects, such as the [Emory Libraries Sass Framework]({%= repo['template-sass'] %}). These files can be pulled into the Pattern Library from other local repos on your system as needed using the [`grunt pull`](#grunt-pull) command.

> Note, the `grunt pull` command has been preconfigured to pull in any files from other (local) repos that the Pattern Library integrates with. You must download or `git clone` these repos to your local machine in a location adjacent to your Pattern Library repo under the repo's default name in order for this to work.

### Pushing Dependencies
Some files within our Pattern Library are utilized by other [Emory Libraries]({%= repo['emory-libraries'] %}) projects, such as the [Emory Libraries Style Guide]({%= repo['style-guide-guide'] %}). These files can be pushed to other local repos on your system as needed using the [`grunt push`](#grunt-push) command.

> Note, the `grunt push` command has been preconfigured to push out any files to other (local) repos that require some integration with the Pattern Library. You must download or `git clone` these repos to your local machine in a location adjacent to your Pattern Library repo under the repo's default name in order for this to work.

### Committing Changes
The `dev` branch is the default branch for committing changes made during development. Committing changes to the `master` and/or `qa` branch(es) directly is not recommended. In order to merge any changes made to the `dev` branch back into the other branches, a pull request should be opened in order to allow for your commits to be reviewed and approved before merging.


### Scaffolding Patterns
To quickly scaffold new patterns and/or pattern groups, simply use the [`grunt plop`](#grunt-plop) command. This command uses our [Plop](#about-plop) templates to quickly generate the files you need. You can also use this command to call a specific generator directly by passing the desired generator's name into the Grunt task as an argument, like `grunt plop:pattern` or `grunt plop:group`.

### Automating Tasks
This project uses [Grunt]({%= link.grunt %}) to help automate common development tasks. For a complete list of built-in Grunt tasks that are available to you, refer to the [Grunt][#grunt] section of this documentation.

### Exporting Patterns
Individual pattern definitions can be exported using the custom [`grunt export`](#grunt-export) task by passing in the Pattern Lab ID (PLID) of the pattern you would like to export, like `grunt export:atoms-button`. If no PLID is given, then all patterns will be exported. The pattern and its asset files (SCSS, JS, etc.) will be exported into their own pattern-specific folders and will include the rendered and markup-only HTML versions of the pattern. These patterns will be exported to the `patternExportDirectory` location set in your `patternlab-config.json`.

> Note, using the [`grunt export`](#grunt-export) task for exporting patterns bypasses Pattern Lab's built-in method for exporting patterns via its CLI. Therefore, you can ignore the `patternExportPatternPartials` option in the `pattern-config.json` altogether as it's no longer needed using this approach.


### Additional Resources
To learn more about the various tools that we use to build and maintain our Pattern Library, check out the resources below.

#### About Pattern Lab
[Pattern Lab]({%= link.patternlab %}) allows you to create atomic design systems and website style guides from the ground up. For more information on the Node version and/or Grunt edition of Pattern Lab, read the [Pattern Lab Docs]({%= link['patternlab-docs'] %}), check out the [Grunt Edition]({%= link['patternlab-grunt'] %}) project on Github, and/or get more details on the [Pattern Lab Node Core]({%= link['patternlab-node'] %}). For demos and other resources, visit to the [Pattern Lab Resource Center]({%= link['patternlab-resources'] %}).

#### About Handlebars
[Handlebars]({%= link.handlebars %}) is a semantic templating language that Pattern Lab uses to bind JSON data with template files in order to generate static HTML. For a complete guide on how to use Handlebars, read the [Handlebars documentation]({%= link.handlebars %}), refer to the [Handlebars API]({%= link['handlebars-api'] %}), and/or check out the [Handlebars project on GitHub]({%= link['handlebars-vs-mustache'] %}).

#### About Plop
[Plop]({%= link.plop %}) is a micro-generator that we use to help quickly scaffold new pieces of our Pattern Library. For more information on what Plop is and how to use it, read through the [Plop documentation]({%= link['plop-docs'] %}) or refer to [Plop repo on Github]({%= link['plop-repo'] %}). To learn more about generating files with Plop, customizing it to meet your needs, and/or extending its functionality, you can also check out the the [Plopfile API]({%= link['plop-api'] %}) and see what an [example Plopfile]({%= link['plop-plopfile'] %}) looks like.
