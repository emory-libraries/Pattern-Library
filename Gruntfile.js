module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*concat: {
            // 2. Configuration for concatinating files goes here.
        },*/
        'string-replace': {
            dev: {
                files: {
                    'source/_meta/_00-head.mustache': 'source/_meta/_00-head.mustache'
                },
                options: {
                    replacements: [
                    // place files inline example
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/styles.min.css?{{ cacheBuster }}" media="all" />',
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
                            replacement: '    <link rel="stylesheet" href="../../css/styles.min.css?{{ cacheBuster }}" media="all" />'
                        },
                        {
                            pattern: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.css?{{ cacheBuster }}" media="all" />',
                            replacement: '    <link rel="stylesheet" href="../../css/pattern-scaffolding.min.css?{{ cacheBuster }}" media="all" />'
                        }
                    ]
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: {
                    'source/css/styles.css': 'source/css/scss/styles.scss',
                    'source/css/pattern-scaffolding.css': 'source/css/pattern-scaffolding.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'source/css/styles.min.css': 'source/css/scss/styles.scss',
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
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['source/css/scss/**/*.scss', 'source/css/pattern-scaffolding.scss'],
                tasks: ['sass','shell:patternlab'],
                options: {
                    spawn: true
                }
            },
            html: {
                files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.md', 'source/_patterns/**/*.json', 'source/_data/*.json', 'source/images/*.svg'],
                tasks: ['shell:patternlab'],
                options: {
                    spawn: true
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-string-replace');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass:dev', 'postcss:dev', 'string-replace:dev','shell:patternlab', 'watch']);
    grunt.registerTask('dev', ['sass:dev', 'postcss:dev', 'string-replace:dev','shell:patternlab']);
    grunt.registerTask('prod', ['sass:dist', 'postcss:dist', 'string-replace:dist', 'shell:patternlab']);

};
