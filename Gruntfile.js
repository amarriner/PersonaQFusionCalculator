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
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-handlebars');
}