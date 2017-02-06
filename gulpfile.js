'use strict';


var fs = require('fs');
var gulp = require('gulp');

var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'amd-optimize']
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'src',
      // routes: {
      //   '/bower_components': 'bower_components'
      // }
    }
  });
});

gulp.task('clean', function () {
  return $.del('dist');
});

gulp.task('build', ['clean'], function() {
  return gulp.src('src/demo02/amd/**/*.js')
    .pipe($.amdOptimize('app',{
      configFile : "src/demo02/require_config.js"
    }))
    .pipe($.concat('app.js'))  //合并后文件
    .pipe(gulp.dest('dist'));  //输出目录
});