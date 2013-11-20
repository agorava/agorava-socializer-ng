module.exports = function (grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy:components',
    'less:dev'
  ]);
  
  grunt.registerTask('copy:components', [
    'copy:lodash',
    'copy:angular',
    'copy:angularUiRouter',
    'copy:restangular',
    'copy:fontAwesome'
  ]);
  
  var configuration = {
    styles: 'src/main/webapp/resources/styles',
    less: 'src/main/webapp/resources/less',
    scripts: 'src/main/webapp/resources/scripts',
    fonts: 'src/main/webapp/resources/fonts',
    components: 'bower_components'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: configuration,

    // CLEAN
    clean: {
      styles: ['<%= config.styles %>/app*.css'],
      scripts: ['<%= config.scripts %>/app*.js']
    },
    
    // COPY
    copy: {
      lodash: {
        expand: true,
        cwd: '<%= config.components %>/lodash/dist/',
        src: '*.js',
        dest: '<%= config.scripts %>/vendors/lodash'
      },
      angular: {
        expand: true,
        cwd: '<%= config.components %>/angular/',
        src: '*.js',
        dest: '<%= config.scripts %>/vendors/angular'
      },
      angularUiRouter: {
        expand: true,
        cwd: '<%= config.components %>/angular-ui-router/release/',
        src: '*.js',
        dest: '<%= config.scripts %>/vendors/angular-ui/router'
      },
      restangular: {
        expand: true,
        cwd: '<%= config.components %>/restangular/dist/',
        src: '*.js',
        dest: '<%= config.scripts %>/vendors/restangular'
      },
      fontAwesome: {
        expand: true,
        cwd: '<%= config.components %>/font-awesome/fonts/',
        src: '*',
        dest: '<%= config.fonts %>'
      }
    },

    // LESS
    less: {
      options: {
        paths: ['<%= config.components %>', '<%= config.less %>']
      },
      dev: {
        files: {
          '<%= config.styles %>/app.css': '<%= config.less %>/app.less'
        }
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          '<%= config.styles %>/app.min.css': '<%= config.less %>/app.less'
        }
      }
    },

    // UGLIFY
    uglify: {
      files: {
        '<%= config.scripts %>/app.min.js': '<%= config.scripts %>/app.js'
      }
    },

    // WATCH
    watch: {
      options: {
        forever: true,
        livereload: false
      },
      less: {
        files: ['<%= config.less %>/**/*.less'],
        tasks: ['less:dev']
      },
      public: {
        options: {
          livereload: true
        },
        files: ['<%= config.styles %>/**/*.css', '<%= config.scripts %>/**/*.js']
      }
    }
  });
};
