 module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: 'public/javascripts/vendor/all.js',
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore"
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"]
        }
      }
    },
    handlebars: {
      all:{
        files: {
          "public/javascripts/handlebars_templates.js": ["handlebars/**/*.hbs"]
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFileName
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js',
            'app.js',
            'routes/*.js',
            'public/javascripts/models/*.js',
            'public/javascripts/collections/*.js',
            'public/javascripts/views/*.js',
            'public/javascripts/application.js',
            'local_modules/todos_module.js'
            ]
    }
  });

  [ "grunt-bower-concat",
    "grunt-contrib-uglify",
    "grunt-contrib-handlebars",
    "grunt-contrib-jshint"
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask("default", ['bower_concat', 'uglify', 'handlebars']);
};

function removeWhitespace(template) {
  return template.replace(/ {2,}/mg, "").replace(/\r|\n/mg, "");
}

function extractFileName(file) {
  return file.match(/\/(.+)\.hbs$/).pop();
}
