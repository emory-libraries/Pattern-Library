// Initialize the CSS method.
module.exports = function() {

  // Load dependencies.
  const _ = require('lodash');
  const path = require('path');
  const fs = require('fs-extra');
  const glob = require('glob').sync;
  const grunt = require('grunt');

  // Load configurations.
  const config = require(path.resolve('./patternlab-config.json'));

  // Get the path to our Sass framework.
  const framework = path.join(config.paths.source.scss, 'vends/emory-libraries/**/__master.scss');

  // Get our Sass framework vendor files.
  const vends = glob(framework)

    // Remove the core master file.
    .filter((src) => {

      // Remove the file.
      return src.indexOf('core/') === -1;

    })

    // Make sure the files are in the correct import order.
    .reduce((result, src) => {

      // Set the proper import order for vendor files.
      const order = ['vends', 'utils', 'config', 'patterns'];

      // Make sure files are ordered correctly.
      _.each(order, (dir, i) => {

        // Place the vendor file in the right order.
        if( src.indexOf(`${dir}/`) > -1 ) result[i] = src;

      });

      // Continue.
      return result;

    }, []);

  // Find all pattern-specific SCSS files.
  const scss = glob(path.join(config.paths.source.patterns, '**/*.scss'))

    // Ignore any temporary files.
    .filter((src) => {

      // Ignore temporary files.
      return path.basename(src).indexOf('.temp') === -1;

    })

    // Get additional data about the files.
    .map((src) => {

      // Get data about the SCSS file.
      const basename = path.basename(src, '.scss');
      const tmp = path.join(path.dirname(src), `${basename}.temp.scss`);
      const contents = fs.readFileSync(path.resolve(src), 'utf8');
      const css = path.join(path.dirname(src), `${basename}.css`);
      const depth = path.dirname(src).split('/').length;
      const imports = vends.map((vend) => "@import '" + ('../').repeat(depth) + vend + "';");
      const output = imports.join('\n') + '\n\n' + contents;

      // Save the data.
      return {
        basename,
        scss: src,
        css,
        tmp,
        depth,
        contents,
        imports,
        output
      };

    });

  // Generate temporary files.
  scss.forEach((file) => {

    // Ensure that a temporary file does not exist, or delete it.
    if( fs.existsSync(file.tmp) ) fs.removeSync(file.tmp);

    // Create the temporary file.
    fs.outputFileSync(file.tmp, file.output);

  });

  // Report success.
  grunt.log.success('Successfully created temporary Sass files for all patterns.');

  // Configure grunt subtasks.
  grunt.config.merge({
    'dart-sass': {
      patterns: {
        options: {
          outputStyle: 'expanded',
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: path.resolve(config.paths.source.patterns),
          src: ['**/*.temp.scss'],
          dest: path.resolve(config.paths.source.patterns),
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: 'last 2 versions'
          })
        ]
      },
      patterns: {
        src: [path.resolve(config.paths.source.patterns, '**/*.css')]
      }
    },
    clean: {
      patterns: [path.resolve(config.paths.source.patterns, '**/*.temp.scss')]
    },
    scrub: {
      patterns: {
        files: [{
          expand: true,
          cwd: path.resolve(config.paths.source.patterns),
          src: ['**/*.css'],
          dest: path.resolve(config.paths.source.patterns)
        }]
      }
    }
  });

  // Load grunt subtasks.
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Register grunt subtasks.
  grunt.registerMultiTask('scrub', 'Scrubs non-pattern-specific CSS', function() {

    // Initialize a list of things to scrub.
    const scrub = [
      /^\@import/,
      /^\/\*\*\*/
    ];

    // Scrub each file.
    this.files.forEach((file) => {

      // Get the contents of the file line-by-line.
      let contents = grunt.file.read(file.src).split('\n');

      // Scrub the file contents.
      scrub.forEach((regex) => {

        // Scrub each line.
        contents = contents.filter((line) => !regex.test(line));

      });

      // Save the file.
      grunt.file.write(file.dest, contents.join('\n'));

    });

    // Report done.
    grunt.log.success(`Successfully scrubbed ${this.files.length} CSS file(s).`);

  });

  // Run grunt subtasks.
  grunt.task.run('dart-sass:patterns', 'postcss:patterns', 'clean:patterns', 'scrub:patterns');

};
