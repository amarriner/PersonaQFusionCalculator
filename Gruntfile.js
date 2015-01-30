module.exports = function(grunt) {
    
    grunt.initConfig({
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
                    dest: 'images/'
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
                    "css/application.min.css": "src/less/application.less"
                }
            }
        },
        uglify: {
            default: {
                files: {
                    'js/application.min.js': [
                        'src/js/persona-q.json', 
                        'src/js/persona-q-skills.json',
                        'src/js/application.js',
                        'src/js/handlebars-templates.js'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('build', 'Run all other Grunt targets to build', function() {
        grunt.log.writeln('Building...');
        
        grunt.task.run('jshint');
        
        grunt.task.run('less');
        
        grunt.task.run('handlebars');
        
        grunt.task.run('uglify');
    });
}