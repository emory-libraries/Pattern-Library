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
                    style: 'expanded'
                },
                files: {
                    'source/css/style.css': 'source/css/scss/style.scss',
                    'source/css/pattern-scaffolding.css': 'source/css/pattern-scaffolding.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'source/css/*.css'
            }
        },
        font_awesome_svg: {
            some_target: {
              destination: "source/images/font-awesome-svg"
            }
        },
        svgstore: {
            options: {
               prefix : 'fa-', // This will prefix each <symbol> ID
            },
            default : {
                files: {
                    'source/images/fa-icon-sprite.svg': ['source/images/font-awesome-svg/*.svg'],
                }
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
    grunt.loadNpmTasks('grunt-font-awesome-svg');
    grunt.loadNpmTasks('grunt-svgstore');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'postcss:dist', 'shell:patternlab', 'watch']);
    grunt.registerTask('fa-svg', ['font_awesome_svg','svgstore']);

};
