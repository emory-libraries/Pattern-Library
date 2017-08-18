module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*concat: {
            // 2. Configuration for concatinating files goes here.
        },*/
        /*'string-replace': {
            dev: {
                files: {
                    'source/_meta/_00-head.mustache': 'source/_meta/_00-head.mustache'
                },
                options: {
                    replacements: [
                    // place files inline example
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/styles-<%= pkg.version %>.min.css?{{ cacheBuster }}" media="all" />',
                            replacement: '    <link rel="stylesheet" href="../../css/styles.css?{{ cacheBuster }}" media="all" />'
                        },
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.min.css?{{ cacheBuster }}" media="all" />',
                            replacement: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.css?{{ cacheBuster }}" media="all" />'
                        }
                    ]
                }
            },
            dist: {
                files: {
                    'source/_meta/_00-head.mustache': 'source/_meta/_00-head.mustache',
                },
                options: {
                    replacements: [
                    // place files inline example
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/styles.css?{{ cacheBuster }}" media="all" />',
                            replacement: '    <link rel="stylesheet" href="../../css/styles-<%= pkg.version %>.min.css?{{ cacheBuster }}" media="all" />'
                        },
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.css?{{ cacheBuster }}" media="all" />',
                            replacement: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.min.css?{{ cacheBuster }}" media="all" />'
                        }
                    ]
                }
            }
        },*/
        sass: {
            devStyles: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: {
                    'source/css/styles.css': 'source/css/scss/styles.scss'
                }
            },
            devPatternScaffolding: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'source/css/pattern-scaffolding.min.css': 'source/css/pattern-scaffolding.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'source/css/styles.css': 'source/css/scss/styles.scss',
                    'dist/css/styles-<%= pkg.version %>.min.css': 'source/css/scss/styles.scss',
                    'source/css/pattern-scaffolding.min.css': 'source/css/pattern-scaffolding.scss'
                }
            },
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')
                ]
            },
            dev: {
                options: {
                    map: true
                },
                src: 'source/css/*.css',
            },
            dist: {
                options: {
                    map: false
                },
                src: 'source/css/*.css',
            }
        },
        shell: {
            patternlab: {
                //command: "php core/builder.php -gnc"
                command: "php core/console --generate"
            }
        },
        copy: {
          main: {
            files: [
                {
                    expand: true,
                    cwd: 'source',
                    src: ['fonts/**'],
                    dest: 'dist/'
                }
            ],
          },
        },
        watch: {
            options: {
                livereload: false
            },
            scss: {
                files: ['source/css/scss/**/*.scss', 'source/css/pattern-scaffolding.scss'],
                tasks: ['sass:dev', 'postcss:dev', 'shell:patternlab'],
                options: {
                    spawn: true
                }
            },
            html: {
                files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.md', 'source/_patterns/**/*.json', 'source/_data/*.json'],
                tasks: ['shell:patternlab'],
                options: {
                    spawn: true
                }
            }
        },
        gitTag: {
            // Default: package.json
            packageFile: 'package.json'
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    //grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-git-tag');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    // One-time dev generation task
    grunt.registerTask('default', ['sass:dev', 'postcss:dev', 'shell:patternlab']);

    // Dev generation task in a watch state
    grunt.registerTask('watch-dev', ['default', 'watch']);

    // Production generation task
    grunt.registerTask('release', ['sass:dist', 'postcss:dist', 'shell:patternlab', 'copy', 'git-tag']);

};
