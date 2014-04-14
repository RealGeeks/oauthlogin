module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    connect: {
      test: {
        port: 8000,
      }
    },
    jasmine: {
      src: 'build/<%= pkg.name %>.js',
      options: {
        specs: 'build/spec.js',
        version: '1.3.1',
        host : 'http://127.0.0.1:8000/'
      }
    },
    jshint: {
      all: 'src/*.js'
    },
    browserify: {
      dist: {
        files: {
          'build/<%= pkg.name %>.js': ['src/**/*.js'],
          'build/spec.js': ['spec/**/*.js']
        }
      },
      options: {
        bundleOptions: {
          standalone: "OauthLogin",
          debug: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('test', ['jshint','browserify','connect','jasmine']);
  grunt.registerTask('build', ['test','uglify']);

};
