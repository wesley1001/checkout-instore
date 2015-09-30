var GruntVTEX = require('grunt-vtex');
var webpackDistConfig = require('./webpack.dist.config.js');
var webpackDevConfig = require('./webpack.config.js');
var glob = require('glob');
var slice = [].slice;
var log = function() {
  return console.log.apply(console, ['grunt-vtex >>>'.yellow].concat(slice.call(arguments)));
};
module.exports = function(grunt) {
  var customConfig, defaultConfig, name, pkg, replaceMap, results, taskArray, taskName, tasks, dryrun;
  pkg = grunt.file.readJSON('package.json');
  dryrun = grunt.option('dry-run') ? '--dryrun' : '';
  
  replaceMap = {};
  replaceMap['{{version}}'] = '' + pkg.version;
  replaceMap['/checkout-instore/'] = '//io.vtex.com.br/' + pkg.name + '/' + pkg.version + '/';
  replaceMap['\<\!\-\-remove\-\-\>(.|\n)*\<\!\-\-endremove\-\-\>'] = '';

  defaultConfig = GruntVTEX.generateConfig(grunt, pkg, {
    followHttps: true,
    replaceMap: replaceMap,
    livereload: !grunt.option('no-lr'),
    relativePath: 'checkout-instore'
  });

  customConfig = {
    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    copy: {
      index: {
        files: [
          {
            src: ['src/index.html'],
            dest: 'build/<%= relativePath %>/index.html'
          }
        ]
      },
      pkg: {
        files: [
          {
            src: ['package.json'],
            dest: 'build/<%= relativePath %>/package.json'
          }
        ]
      },
      deploy: {
        files: [
          {
            expand: true,
            cwd: 'build/<%= relativePath %>/',
            src: ['**'],
            dest: pkg.deploy + '/' + pkg.version
          }
        ],
        options: {
          processContentExclude: ['**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'],
          process: function(src, srcpath) {
            var file, i, k, len, ref, ref1, replaceFiles, v;
            replaceFiles = (ref = grunt.config('deployReplaceFiles')) != null ? ref : grunt.config('deployReplaceFiles', glob.sync('build/**/{index.html,app.js}'));
            for (i = 0, len = replaceFiles.length; i < len; i++) {
              file = replaceFiles[i];
              if (!(file.indexOf(srcpath) >= 0)) {
                continue;
              }
              log('Replacing file...', file);
              ref1 = replaceMap;
              for (k in ref1) {
                v = ref1[k];
                log('Replacing key', k, 'with value', v);
                src = src.replace(new RegExp(k, 'g'), v);
              }
            }
            return src;
          }
        }
      }
    },

    shell: {
      sync: {
        command: 'aws s3 sync --size-only ' + dryrun + ' ' + pkg.deploy + ' s3://vtex-io-us/' + pkg.name + '/'
      },
      cp: {
        command: 'aws s3 cp --recursive ' + dryrun + ' ' + pkg.deploy + ' s3://vtex-io-us/' + pkg.name + '/'
      },
      sync_br: {
        command: 'aws s3 sync --size-only ' + dryrun + ' ' + pkg.deploy + ' s3://vtex-io/' + pkg.name + '/'
      },
      cp_br: {
        command: 'aws s3 cp --recursive ' + dryrun + ' ' + pkg.deploy + ' s3://vtex-io/' + pkg.name + '/'
      }
    }
  };

  tasks = {
    build: ['clean', 'copy:index', 'webpack', 'copy:pkg'],
    dist: ['build', 'copy:deploy'],
    test: [],
    vtex_deploy: ['shell:cp'],
  };

  grunt.config.init(defaultConfig);
  grunt.config.merge(customConfig);
  for (name in pkg.devDependencies) {
    if (name.slice(0, 6) === 'grunt-' && name !== 'grunt-vtex') {
      grunt.loadNpmTasks(name);
    }
  }
  results = [];
  for (taskName in tasks) {
    taskArray = tasks[taskName];
    results.push(grunt.registerTask(taskName, taskArray));
  }
  return results;
};
