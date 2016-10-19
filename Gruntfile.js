module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*concat: {
            // 2. Configuration for concatinating files goes here.
        },*/
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'source/css/style.min.css': 'source/css/scss/style.scss',
                    'source/css/pattern-scaffolding.min.css': 'source/css/pattern-scaffolding.scss'
                }
            }
        },
        postcss: {
          options: {
            map: true, // inline sourcemaps

            // or
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'source/css/maps/' // ...to the specified directory
            }
          },
          dist: {
            src: 'source/css/*.css'
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
    grunt.loadNpmTasks('grunt-shell');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'shell:patternlab', 'watch']);
};
