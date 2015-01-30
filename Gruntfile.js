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
                    "js/handlebars-templates.js": "templates/*.hbs"
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                reporterOutput: 'jshint.log',
                globals: {
                    jQuery: true
                }
            },
            uses_defaults: ['js/application.js']
        },
        less: {
            development: {
                options: {
                    compress: false,
                    paths: ["less/**/*"]
                },
                files: {
                    "css/application.css": "less/application.less"
                }
            },
            production: {
                options: {
                    compress: true,
                    paths: ["less/**/*"]
                },
                files: {
                    "css/application.css": "less/application.less"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
}