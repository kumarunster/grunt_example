// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({
 
    includes: {
      files: {
        src: ['prepare_include/index.html'], // Source files
        dest: '__index.html', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
          banner: '<!-- I am a banner <% includes.files.dest %> -->'
        }
      }
    },
      
    useminPrepare: {
        html: 'content/xyz/__main.html',
        options: {
          dest: '.',
          staging: '.',
          root: '.'
        }
      },
    copy:{
	    release: {
	    	src: 'content/xyz/__main.html', 
            dest: 'content/xyz/__release.html'
	    }
	  },
    usemin: {
        html: 'content/xyz/__release.html'
    },
      
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: [__dirname], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
 
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['parent_include/**/*', 'content/**/*'],
        options: { livereload: true },
        tasks: ['includes:files']
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>/__index.html'
      }
    },
      
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        app: {
            files: {
                'app': ['concat/content/xyz/release/released.js']
            },
        }
    }
  });
 
  // Creates the `server` task
  grunt.registerTask('server', [
    'express',
    'open',
    'watch:all'
  ]);
    
  grunt.registerTask('release', [
    'useminPrepare',
    'copy',
    'concat',
    //'ngAnnotate',
    'uglify',
    'usemin'
  ]);
};