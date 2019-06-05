// Initialize the push method.
module.exports = function( id = null ) {

  // Load dependencies.
  const _ = require('lodash');
  const path = require('path');
  const fs = _.extend(require('fs-extra'), {

    symlinkExistsSync( src ) {

      // Initialize a flag.
      let exists = false;

      // Determine if the symlink exists.
      try {

        if( fs.lstatSync(src) ) exists = true;

      } catch (error) {

        exists = false;

      }

      // Return the flag.
      return exists;

    }

  });
  const glob = require('glob').sync;
  const utils = require('./utils.js');
  const handlebars = require('handlebars');
  const fm = require('gray-matter');
  const spawn = require('child_process').spawn;
  const grunt = require('grunt');

  // Make asynchronous.
  const done = this.async();

  // Register Handlebars helpers.
  handlebars.registerHelper(require('handlebars-helpers')());

  // Load configurations.
  const config = require('../patternlab-config.json');
  const pkg = require('../package.json');

  // Get the current package version.
  const version = pkg.version;

  // Get data about all patterns.
  const patterns = utils.patterns();

  // Get atomic structure of patterns.
  const atomic = utils.atomic();

  // Get directory names of atomic group.
  const atomicGroup = Object.keys(atomic).reduce((result, group) => {

    // Determine the atomic group's folder name.
    result[group] = atomic[group] ? `${atomic[group]}-${group}` : group;

    // Continue.
    return result;

  }, {});

  // Build list of things to push out.
  const push = [

    // [Style Guide](https://github.com/emory-libraries/style-guide-guide)
    {
      id: 'style-guide-guide',
      repo: 'https://github.com/emory-libraries/style-guide-guide',
      dir: path.resolve('../style-guide-guide'),
      files: [
        {
          src: path.resolve(config.patternExportDirectory, '*'),
          dest: 'patterns'
        }
      ],
      before( done ) {

        // Export all patterns.
        require(path.resolve(__dirname, 'export.js'))();

        // Ensure a pattern directory exist for each atomic group.
        Object.keys(atomicGroup).forEach((group) => {

          // Build the folder structure.
          fs.ensureDirSync(path.resolve(this.dir, '07-user-interface', atomicGroup[group]));

          // Get the index file path for the directory.
          const index = path.resolve(this.dir, '07-user-interface', atomicGroup[group], '01-index.md');

          // Initialize a markdown file in each folder if one doesn't already exists.
          if( !fs.existsSync(index) ) {

            // Get the markdown template.
            const md = fs.readFileSync(path.resolve(__dirname, 'templates/atomic.md'), 'utf8');

            // Compile the markdown template with handlebars.
            const template = handlebars.compile(md);

            // Merge data into the template file.
            const output = template({group});

            // Save the index file.
            fs.outputFileSync(index, output);

          }

        });

        // Generate CSS and JS files.
        const assets = spawn('grunt', ['build:dev:scss', 'build:dev:js']);

        // Copy CSS and JS files.
        assets.on('close', () => {

          // Get asset paths.
          const css = glob(path.resolve(config.paths.public.css, '**/*.css')).map((file) => ({
            src: file,
            dest: path.join(this.dir, 'css', path.basename(file))
          }));
          const js = glob(path.resolve(config.paths.public.js, '**/*.js')).map((file) => ({
            src: file,
            dest: path.join(this.dir, 'js', path.basename(file))
          }));

          // Copy all assets.
          css.forEach((css) => fs.copySync(css.src, css.dest));
          js.forEach((js) => fs.copySync(js.src, js.dest));

          // Done.
          done();

        });

      },
      during( src ) {

        // Get the pattern ID.
        const id = path.basename(src);

        // Get the pattern's meta data.
        const data = patterns[id];

        // Get the markdown templates.
        const md = fs.readFileSync(path.resolve(__dirname, 'templates/pattern.md'), 'utf8');

        // Compile the markdown templates with handlebars.
        const hbs = handlebars.compile(md);

        // Get pattern contents.
        const content = fs.readFileSync(data.pattern.src, 'utf8');

        // Merge data into the the template file.
        const output = hbs(_.extend({}, data.pattern, {
          docs: fm(content)
        }));

        // Get pattern file name.
        const name = data.pattern.plid.replace(data.pattern.group + '-', '');

        // Get destination path.
        const dest = path.join(this.dir, '07-user-interface', atomicGroup[data.pattern.group], `${name}.md`);

        // Save the generated file.
        fs.outputFileSync(dest, output);

        // Get template.
        const template = fs.readFileSync(data.template, 'utf8');

        // Get the pattern destination.
        const pattern = path.join(this.dir, 'patterns', data.pattern.id, `${data.pattern.id}.liquid`);

        // Save a Jekyll-compatible version of the template.
        fs.outputFileSync(pattern, `{% raw %}${template}{% endraw %}`);


      },
      after() {

        // Get the path to the patterns folder.
        const src = path.join(this.dir, 'patterns');

        // Set the path to a symlink destination in the includes folder.
        const dest = path.join(this.dir, '_includes/patterns');

        // Ensure that a symlink doesn't already exist, or delete it.
        if( fs.symlinkExistsSync(dest) ) fs.removeSync(dest);

        // Add a new symlink for the patterns folder in the includes folder.
        fs.symlinkSync(path.relative(path.resolve(this.dir, '_includes'), src), dest);

      }
    },

    // [Templating Engine](https://github.com/emory-libraries/templating-engine)
    {
      id: 'templating-engine',
      repo: 'https://github.com/emory-libraries/templating-engine',
      dir: path.resolve('../templating-engine'),
      files: [
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.tokens}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.tokens}`
        },
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.atoms}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.atoms}`
        },
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.molecules}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.molecules}`
        },
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.compounds}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.compounds}`
        },
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.organisms}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.organisms}`
        },
        {
          src: path.resolve(config.paths.source.patterns, `${atomicGroup.templates}/**/*.${config.patternExtension}`),
          dest: `src/patterns/__environment__/${atomicGroup.templates}`
        },
        {
          src: path.resolve(config.paths.source.data, `!(*.default).json`),
          dest: 'src/engine/__environment__/meta'
        },
        {
          src: path.resolve(config.paths.dist.images.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/images'
        },
        {
          src: path.resolve(config.paths.dist.icons.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/icons'
        },
        {
          src: path.resolve(config.paths.dist.logos.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/logos'
        },
        {
          src: path.resolve(config.paths.dist.fonts.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/fonts'
        },
        {
          src: path.resolve(config.paths.dist.php.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/php/scripts'
        },
        {
          src: path.resolve(config.paths.dist.css.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/css'
        },
        {
          src: path.resolve(config.paths.dist.js.replace('<%= pkg.version %>', `${version}-push`), '*'),
          dest: 'src/engine/__environment__/js'
        }
      ],
      before( done ) {

        // Ensure the pattern directory exists.
        fs.ensureDirSync(path.resolve(this.dir, 'src/patterns/__environment__/'));

        // Ensure a pattern directory exists for each atomic group.
        Object.values(atomicGroup).forEach((group) => {

          // Build the folder structure.
          fs.ensureDirSync(path.resolve(this.dir, `src/patterns/__environment__/${group}`));

        });

        // Generate distribution JS and CSS.
        const assets = spawn('grunt', ['dist']);

        // Done.
        assets.on('close', () => done());

      }
    }

  ];

  // Initialize tasks.
  const tasks = [];

  // Capture errors.
  const errors = [];

  // Temporarily change the package version to simulate a distribution build.
  tasks.push(new Promise((resolve) => {

    // Temporarily change the package version.
    fs.writeJsonSync(path.resolve('package.json'), _.merge(pkg, {version: `${version}-push`}), {spaces: 2});

    // Resolve.
    resolve();

  }));

  // Push things to other projects.
  push.forEach((item) => {

    // Push items by ID if given, or push everything if no ID is given.
    if( !_.isNull(id) && item.id != id ) return;

    // Ensure that the other project exists on the current user's system.
    if ( fs.existsSync(item.dir) ) {

      // Do stuff that needs to happen before the item is pushed.
      const before = new Promise((resolve, reject) => {

        // Do some stuff.
        if( item.before && _.isFunction(item.before) ) item.before(resolve, reject);

        // Otherwise, be done.
        else resolve();

      });

      // Push some stuff.
      tasks.push(Promise.all([before]).then(() => {

        // Report that the item is being pushed.
        process.stdout.write(`Started pushing items to '${item.id}'... `);

        // Push files from our Pattern Library.
        item.files.forEach((file) => {

          // Copy all sources to the destination.
          glob(file.src).forEach((src) => {

            // Get the destination.
            const dest = path.join(item.dir, file.dest, path.basename(src));

            // Ensure that the destination does not exist, or delete it.
            if( fs.existsSync(dest) ) fs.removeSync(dest);

            // Ensure that the source exists, and copy it.
            if( fs.existsSync(src) ) fs.copySync(src, dest);

            // Otherwise, report that the source could not be found.
            else errors.push(`Could not find '${src}' to push to '${item.id}'.`);

            // Also do stuff that needs to happen during items being pushed.
            if( item.during && _.isFunction(item.during) ) item.during(src);

          });

        });

        // Report that the item was pushed.
        process.stdout.write(`Done.\n`);

        // Do stuff that needs to happen after the item is pushed.
        if( item.after && _.isFunction(item.after) ) item.after();

      }));

    }

    // Otherwise, report that the item could not be found.
    else {

      // Report.
      errors.push(`Could not find '${item.id}' on your system. ` +
                  `Please ensure that it has been downloaded from ` +
                  `'${item.repo}' and is located at '${item.dir}'.`);

    }

  });

  // Wait for pushes to finish.
  Promise.all(tasks).then(() => {

    // Report errors.
    if( errors.length > 0 ) {

      // Report that the push completed with errors.
      console.log('Push completed with errors.');

      // Report errors.
      errors.forEach((error) => console.log(error));

    }

    // Otherwise, report done.
    else console.log('Push completed successfully.');

    // Reset the package version.
    fs.writeJsonSync(path.resolve('package.json'), _.merge(pkg, {version}), {spaces: 2});

    // Remove the temporary build.
    fs.removeSync(path.resolve(`dist/${version}-push`));

    // Done.
    done();

  });

};
