module.exports = function(grunt) {
    
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    base: '.',
                    port: 8000.
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "personaQTemplates",
                    partialsUseNamespace: true,
                    processName: function(filePath) {
                        var name = filePath.split("/")[filePath.split("/").length - 1].split(".")[0];
                        
                        var r = "";
                        for (var i = 0; i < name.split('-').length; i++) {
                            var word = name.split("-")[i];
                            
                            if (r !== "") {
                                r += word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase();
                            }
                            else {
                                r += word.toLowerCase();
                            }
                        }
                        
                        return r;
                    }
                },
                files: {
                    "src/js/handlebars-templates.js": "src/templates/*.hbs"
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                reporterOutput: 'logs/jshint.log',
                globals: {
                    jQuery: true
                }
            },
            uses_defaults: ['/src/js/application.js']
        },
        less: {
            development: {
                options: {
                    compress: false,
                    paths: ["less/**/*"]
                },
                files: {
                    "src/css/application.css": "src/less/application.less"
                }
            },
            production: {
                options: {
                    compress: true,
                    paths: ["less/**/*"]
                },
                files: {
                    "/dist/css/application.min.css": "src/less/application.less"
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8000/test/index.html',
                    ]
                }
            }
        },
        uglify: {
            default: {
                files: {
                    '/dist/js/application.min.js': [
                        'src/js/persona-q.json', 
                        'src/js/persona-q-skills.json',
                        'src/js/application.js',
                        'src/js/handlebars-templates.js'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('test', ['connect', 'qunit']);
    grunt.registerTask('build', ['jshint', 'test', 'less', 'handlebars', 'uglify']);    
}