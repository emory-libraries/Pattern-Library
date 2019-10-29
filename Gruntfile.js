module.exports = function(grunt) {

  const _ = require('lodash');
  const path = require('path');
  const fs = require('fs-extra');
  const argv = require('minimist')(process.argv.slice(2));

  // Pattern Lab configuration(s)
  const config = require('./patternlab-config.json');
  const pkg = grunt.config.init({pkg: grunt.file.readJSON('package.json')});
  const secret = grunt.config.merge({secret: grunt.file.readJSON('secret.json')});
  const paths = grunt.config.process(config.paths);

  // Define a list of files to ignore during `uglify`.
  // Paths are relative to the `dist/js/` folder.
  const noUglify = [
    // 'dependencies/foo/foo.js'
  ];

  // Initialize configurations
  grunt.config.merge({
    clean: {
      public: [path.resolve(paths.public.root)]
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.images),
            src: '**/*',
            dest: path.resolve(paths.public.images)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.fonts),
            src: '**/*',
            dest: path.resolve(paths.public.fonts)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.icons),
            src: '**/*',
            dest: path.resolve(paths.public.icons)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.logos),
            src: '**/*',
            dest: path.resolve(paths.public.logos)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.root),
            src: 'favicon.ico',
            dest: path.resolve(paths.public.root)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.styleguide),
            src: '**/*',
            dest: path.resolve(paths.public.root)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.js),
            src: '**/*.json',
            dest: path.resolve(paths.public.js)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.php),
            src: '**/*.php',
            dest: path.resolve(paths.public.php)
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.images),
            src: '**/*',
            dest: path.resolve(paths.dist.images)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.fonts),
            src: '**/*',
            dest: path.resolve(paths.dist.fonts)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.icons),
            src: '**/*',
            dest: path.resolve(paths.dist.icons)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.logos),
            src: '**/*',
            dest: path.resolve(paths.dist.logos)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.root),
            src: 'favicon.ico',
            dest: path.resolve(paths.dist.root)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.js),
            src: '**/*.json',
            dest: path.resolve(paths.dist.js)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.php),
            src: '**/!(example-)*.php',
            dest: path.resolve(paths.dist.php)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.images),
            src: '**/*',
            dest: path.resolve(paths.public.images)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.fonts),
            src: '**/*',
            dest: path.resolve(paths.public.fonts)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.icons),
            src: '**/*',
            dest: path.resolve(paths.public.icons)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.logos),
            src: '**/*',
            dest: path.resolve(paths.public.logos)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.root),
            src: 'favicon.ico',
            dest: path.resolve(paths.public.root)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.styleguide),
            src: '**/*',
            dest: path.resolve(paths.public.root)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.js),
            src: '**/*.json',
            dest: path.resolve(paths.public.js)
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.php),
            src: '**/example-*.php',
            dest: path.resolve(paths.public.php)
          }
        ]
      }
    },
    watch: {
      assets: {
        files: [
          path.resolve(paths.source.fonts, '**'),
          path.resolve(paths.source.images, '**'),
          path.resolve(paths.source.icons, '**'),
          path.resolve(paths.source.logos, '**'),
        ],
        tasks: ['build:dev:patternlab', 'bsReload']
      },
      patternlab: {
        files: [
          path.resolve(paths.source.patterns, '**'),
          path.resolve(paths.source.data, '**'),
          path.resolve(paths.source.meta, '**'),
          '!' + path.resolve(paths.source.patterns, '**/*.css'),
        ],
        tasks: ['build:dev:patternlab', 'bsReload']
      },
      config: {
        options: {
          reload: true
        },
        files: [
          path.resolve(paths.source.root, '*.ico'),
          path.resolve(paths.root, 'Gruntfile.js'),
          path.resolve(paths.root, 'Plopfile.js'),
          path.resolve(paths.root, 'patternlab-config.json'),
          path.resolve(paths.root, '.eslintrc'),
          path.resolve(paths.root, '.babelrc'),
          path.resolve(paths.root, '.jshintrc')
        ],
        tasks: ['dev:startup']
      },
      scss: {
        files: [
          path.resolve(paths.source.scss, '**/*.scss'),
          '!' + path.resolve(paths.source.scss, 'patterns/__master.scss'),
          path.resolve(paths.source.patterns, '**/*.scss')
        ],
        tasks: ['build:dev:scss', 'build:dev:patternlab', 'bsReload']
      },
      js: {
        files: [
          path.resolve(paths.source.js, '**/*.js'),
          '!' + path.resolve(paths.source.js, 'bundle.js'),
          path.resolve(paths.source.patterns, '**/*.js')
        ],
        tasks: ['jshint:dev', 'build:dev:js', 'build:dev:patternlab', 'bsReload']
      },
      php: {
        files: [
          path.resolve(paths.source.php, '**')
        ],
        tasks: ['build:dev:patternlab', 'bsReload']
      },
      extensions: {
        files: [
          path.resolve(paths.source.extensions, '**/*')
        ],
        tasks: ['build:dev:patternlab', 'bsReload']
      }
    },
    php: {
      server: {
        options: {
          hostname: '127.0.0.1',
          port: 9000,
          base: path.resolve(paths.public.root),
          keepalive: false,
          open: false
        }
      }
    },
    browserSync: {
      server: {
        options: {
          open: 'local',
          proxy: '<%= php.server.options.hostname %>:<%= php.server.options.port %>',
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [{
            module: 'bs-html-injector',
            options: {
              files: [path.resolve(paths.public.root, 'index.html'), path.resolve(paths.public.styleguide, 'styleguide.html')]
            }
          }],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths.public.root, '**/*.css'),
      js: path.resolve(paths.public.root, '**/*.js')
    },
    sass_import: {
      scss: {
        src: [
          path.resolve(paths.source.patterns, '*-meta/**/*.scss'),
          path.resolve(paths.source.patterns, '*-tokens/**/*.scss'),
          path.resolve(paths.source.patterns, '*-atoms/**/*.scss'),
          path.resolve(paths.source.patterns, '*-molecules/**/*.scss'),
          path.resolve(paths.source.patterns, '*-compounds/**/*.scss'),
          path.resolve(paths.source.patterns, '*-organisms/**/*.scss'),
          path.resolve(paths.source.patterns, '*-templates/**/*.scss')
        ],
        dest: path.resolve(paths.source.scss, 'patterns/__master.scss')
      }
    },
    'dart-sass': {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: path.resolve(paths.source.scss),
          src: ['*.scss'],
          dest: path.resolve(paths.public.css),
          ext: '.css'
        }]
      },
      dist_unmin: {
        options: {
          outputStyle: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.scss),
            src: ['*.scss'],
            dest: path.resolve(paths.public.css),
            ext: '.css'
          },
          {
            expand: true,
            cwd: path.resolve(paths.source.scss),
            src: ['style.scss'],
            dest: path.resolve(paths.dist.css),
            ext: '.css'
          }
        ]
      },
      dist_min: {
        options: {
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.scss),
            src: ['style.scss'],
            dest: path.resolve(paths.dist.css),
            ext: '.min.css'
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      dev: [
        path.resolve(paths.source.js, '*.js'),
        '!' + path.resolve(paths.source.js, 'bundle.js'),
        path.resolve(paths.source.patterns, '**/*.js')
      ]
    },
    concat: {
      dev: {
        files: [{
          src: [
            path.resolve(paths.source.js, '_head.index.js'),
            path.resolve(paths.source.js, 'index.js'),
            path.resolve(paths.source.patterns, '**/*.js'),
            '!' + path.resolve(paths.source.patterns, '**/_*.js'),
            path.resolve(paths.source.js, '_foot.index.js')
          ],
          dest: path.resolve(paths.public.js, 'bundle.js')
        }]
      },
      dist: {
        files: [
          {
            src: [
              path.resolve(paths.source.js, '_head.index.js'),
              path.resolve(paths.source.js, 'index.js'),
              path.resolve(paths.source.patterns, '**/*.js'),
              path.resolve(paths.source.js, '_foot.index.js')
            ],
            dest: path.resolve(paths.dist.js, 'bundle.js')
          },
          {
            src: [
              path.resolve(paths.source.js, '_head.index.js'),
              path.resolve(paths.source.js, 'index.js'),
              path.resolve(paths.source.patterns, '**/*.js'),
              path.resolve(paths.source.js, '_foot.index.js')
            ],
            dest: path.resolve(paths.public.js, 'bundle.js')
          }
        ]
      }
    },
    browserify: {
      dev: {
        options: {
          transform: ['babelify']
        },
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.js),
            src: ['**/*.js', '!index.js'],
            dest: path.resolve(paths.public.js)
          },
          {
            src: [path.resolve(paths.public.js, 'bundle.js')],
            dest: path.resolve(paths.public.js, 'bundle.js')
          }
        ]
      },
      dist_unmin: {
        options: {
          transform: [
            ['envify', {
              NODE_ENV: 'production',
              global: true
            }],
            'babelify'
          ]
        },
        files: [
          {
            expand: true,
            cwd: path.resolve(paths.source.js),
            src: ['**/*.js', '!index.js'],
            dest: path.resolve(paths.public.js)
          },
          {
            src: [path.resolve(paths.public.js, 'bundle.js')],
            dest: path.resolve(paths.public.js, 'bundle.js')
          },
          {
            src: [path.resolve(paths.dist.js, 'bundle.js')],
            dest: path.resolve(paths.dist.js, 'bundle.js')
          }
        ]
      },
      dist_min: {
        options: {
          transform: [
            ['envify', {
              NODE_ENV: 'production',
              global: true
            }],
            'babelify',
            ['uglifyify', {global: true}]
          ]
        },
        files: [
          {
            src: [path.resolve(paths.dist.js, 'bundle.js')],
            dest: path.resolve(paths.dist.js, 'bundle.min.js')
          }
        ]
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
      dev: {
        src: [path.resolve(paths.public.css, '**/*.css')]
      },
      dist: {
        src: [
          path.resolve(paths.public.css, '**/*.css'),
          path.resolve(paths.dist.css, '**/*.css')
        ]
      }
    },
    cssmin: {
      dist: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: path.resolve(paths.dist.css),
          src: ['style.min.css'],
          dest: path.resolve(paths.dist.css)
        }]
      }
    },
    gitTag: {
      packageFile: 'package.json'
    },
    environments: {
      patternlab: {
        options: {
          release_root: 'patternlab',
          current_symlink: 'current',
          local_path: 'public',
          tag: '<%= pkg.version %>',
          deploy_path: '<%= secret.production.path %>',
          host: '<%= secret.production.host %>',
          username: '<%= secret.production.username %>',
          password: '<%= secret.production.password %>',
          port: '<%= secret.production.port %>'
        }
      },
      release: {
        options: {
          release_root: 'releases',
          current_symlink: 'latest',
          local_path: 'dist/<%= pkg.version %>',
          tag: '<%= pkg.version %>',
          deploy_path: '<%= secret.production.path %>',
          host: '<%= secret.production.host %>',
          username: '<%= secret.production.username %>',
          password: '<%= secret.production.password %>',
          port: '<%= secret.production.port %>'
        }
      }
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      dist: {
        NODE_ENV: 'production'
      }
    }
  });

  // Load tasks
  require('load-grunt-tasks')(grunt);

  // Register tasks
  grunt.registerTask('default', ['dev']);

  /* patternlab */
  grunt.registerTask('patternlab', 'Create design systems with atomic design', function(arg) {

    const done = this.async();

    const patternlab = require('patternlab-node')(config);

    switch(arg) {

      case 'build': patternlab.build(() => done(), config.cleanPublic); break;

      case 'version': patternlab.version(); done(); break;

      case 'patternsonly': patternlab.patternsonly(() => done(), config.cleanPublic); break;

      case 'liststarterkits': patternlab.liststarterkits(); done(); break;

      case 'loadstarterkit': patternlab.loadstarterkit(argv.kit, argv.clean); done(); break;

      default: patternlab.help(); done();

    }

  });

  /* build:dev */
  grunt.registerTask('build:dev', [
    'clean:public',
    'build:dev:scss',
    'build:dev:js',
    'build:dev:patternlab'
  ]);
  grunt.registerTask('build:dev:patternlab', [
    'patternlab:build',
    'copy:dev'
  ]);
  grunt.registerTask('build:dev:scss', [
    'css',
    'sass_import',
    'dart-sass:dev',
    'postcss:dev',
    'status:export'
  ]);
  grunt.registerTask('build:dev:js', [
    'concat:dev',
    'browserify:dev'
  ]);

  /* build:dist */
  grunt.registerTask('build:dist', [
    'clean:public',
    'build:dist:scss',
    'build:dist:js',
    'build:dist:patternlab'
  ]);
  grunt.registerTask('build:dist:patternlab', [
    'patternlab:build',
    'copy:dist',
    'bsReload'
  ]);
  grunt.registerTask('build:dist:scss', [
    'css',
    'sass_import',
    'dart-sass:dist_unmin',
    'dart-sass:dist_min',
    'postcss:dist',
    'cssmin',
    'status:export'
  ]);
  grunt.registerTask('build:dist:js', [
    'concat:dist',
    'browserify:dist_unmin',
    'browserify:dist_min'
  ]);

  /* serve */
  grunt.registerTask('serve', [
    'php:server',
    'browserSync:server'
  ]);

  /* dev */
  grunt.registerTask('dev:startup', [
    'build:dev',
    'bsReload'
  ]);
  grunt.registerTask('dev:buildonly', [
    'env:dev',
    'build:dev'
  ]);
  grunt.registerTask('dev', [
    'dev:startup',
    'serve',
    'watch'
  ]);

  /* dist */
  grunt.registerTask('dist', [
    'env:dist',
    'build:dist'
  ]);

  /* release */
  grunt.registerTask('release', [
    'deploy',
    'git-tag'
  ]);

  /* deploy */
  grunt.registerTask('deploy', [
    'dist',
    'ssh_deploy:release',
    'ssh_deploy:patternlab',
    'webdav'
  ]);

  /* export */
  grunt.registerTask('export', 'Exports a pattern and its assets', require('./scripts/export.js'));

    /* pull */
  grunt.registerTask('pull', 'Pull the our Sass Framework and other dependencies into our Pattern Library', require('./scripts/pull.js'));

  /* push */
  grunt.registerTask('push', 'Push Pattern Library patterns and assets to our Style Guide Guide', require('./scripts/push.js'));

  /* css */
  grunt.registerTask('css', 'Generate pattern-specific CSS for all patterns', require('./scripts/css.js'));

  /* map */
  grunt.registerTask('map', 'Retrieve some data from Google Maps and save it to a JSON file', require('./scripts/map.js'));

  /* status */
  grunt.registerTask('status', 'Update the status of a pattern', require('./scripts/status.js'));

  /* webdav */
  grunt.registerTask('webdav', 'Upload files to the web server via webdav', require('./scripts/webdav.js'));

};
