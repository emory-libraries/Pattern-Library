// Initialize the pull method.
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

  // Make asynchronous.
  const done = this.async();

  // Load configurations.
  const config = require('../patternlab-config.json');

  // Build list of things to pull in.
  const pull = [

    // [Sass Framework](https://github.com/emory-libraries/template-sass)
    {
      id: 'template-sass',
      repo: 'https://github.com/emory-libraries/template-sass',
      dir: path.resolve('../template-sass'),
      files: [
        {
          src: 'scss/_emory-libraries.scss',
          dest: path.resolve(config.paths.source.scss, 'vends/')
        },
        {
          src: 'scss/emory-libraries',
          dest: path.resolve(config.paths.source.scss, 'vends/')
        },
        {
          src: 'assets/icons/svg/',
          dest: path.resolve(config.paths.source.icons)
        },
        {
          src: 'assets/icons/php/',
          dest: path.resolve(config.paths.source.icons)
        },
        {
          src: 'assets/icons/sprite/',
          dest: path.resolve(config.paths.source.icons)
        },
        {
          src: 'fonts/',
          dest: path.resolve(config.paths.source.root)
        }
      ],
      after() {

        // Get the location of the master vendor file.
        const target = path.resolve(config.paths.source.scss, 'vends/__master.scss');

        // Read the contents of the master vendor file.
        let contents = fs.readFileSync(target, 'utf8');

        // Ensure that an import line exists for the Sass Framework.
        if( contents.indexOf("@import 'emory-libraries';") === -1 ) {

          // Breakup the file into lines.
          contents = contents.split("\n").filter((line) => line !== '');

          // Add the import at the end of the file.
          contents.push("@import 'emory-libraries';");

          // Recompile the file.
          contents = contents.join("\n");

        }

        // Save the file.
        fs.writeFileSync(target, contents);

      }
    }

  ];

  // Initialize tasks.
  const tasks = [];

  // Capture errors.
  const errors = [];

  // Pull things into the project.
  pull.forEach((item) => {

    // Pull items by ID if given, or pull everything if no ID is given.
    if( !_.isNull(id) && item.id != id ) return;

    // Ensure that the other project exists on the current user's system.
    if ( fs.existsSync(item.dir) ) {

      // Do stuff that needs to happen before the item is pulled.
      const before = new Promise((resolve, reject) => {

        // Do some stuff.
        if( item.before && _.isFunction(item.before) ) item.before(resolve, reject);

        // Otherwise, be done.
        else resolve();

      });

      // Pull some stuff.
      tasks.push(Promise.all([before]).then(() => {

        // Report that the item is being pulled.
        process.stdout.write(`Started pulling items from '${item.id}'... `);

        // Pull files from the other project.
        item.files.forEach((file) => {

          // Get all sources relative to the project.
          const src = path.join(item.dir, file.src);

          // Copy all sources to the destination.
          glob(src).forEach((src) => {

            // Get the source and destination.
            const dest = path.join(file.dest, path.basename(src));

            // Ensure that the destination does not exist, or delete it.
            if( fs.existsSync(dest) ) fs.removeSync(dest);

            // Ensure that the source exists, and copy it.
            if( fs.existsSync(src) ) fs.copySync(src, dest);

            // Otherwise, report that the source could not be found.
            else errors.push(`Could not find '${src}' to pull from '${item.id}'.`);

            // Also do stuff that needs to happen during items being pulled.
            if( item.during && _.isFunction(item.during) ) item.during(src);

          });

        });

        // Report that the item was pulled.
        process.stdout.write(`Done.\n`);

        // Do stuff that needs to happen after the item is pulled.
        if( item.after && _.isFunction(item.after) ) item.after();

      }));

    }

    // Otherwise, report that the item could not be found.
    else {

      // Report.
      errors.push(`Could not fine '${item.id}' on your system. ` +
                  `Please ensure that it has been downloaded from ` +
                  `'${item.repo}' and is located at '${item.dir}'.`);

    }

  });

  // Wait for pulls to finish.
  Promise.all(tasks).then(() => {

    // Report errors.
    if( errors.length > 0 ) {

      // Report that the pull completed with errors.
      console.log('Pull completed with errors.');

      // Report errors.
      errors.forEach((error) => console.log(error));

    }

    // Otherwise, report done.
    else console.log('Pull completed successfully.');

    // Done.
    done();

  });

};
