module.exports = function(grunt) {
    
    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    namespace: "personaQTemplates",
                    partialsUseNamespace: true,
                    processName: function(filePath) {
                        return filePath.split("/")[filePath.split("/").length - 1].split(".")[0];
                    }
                },
                files: {
                    "js/handlebars-templates.js": "templates/*.hbs"
                }
            }
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
    grunt.loadNpmTasks('grunt-contrib-less');
}