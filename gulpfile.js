var gulp = require('gulp');

var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');


gulp.task('less', function() {
  return gulp.src('app/less/**/*.less')
      .pipe(less())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
         stream: true
       }))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('public'))
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});
gulp.task('watch', ['browserSync','less'],function(){
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);
});