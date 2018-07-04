var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');


gulp.task('connect', ()=>{
  connect.server({
    livereload: true
  });
});


gulp.task('html',()=>{
  gulp.src('*.html')
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});


gulp.task('jsReload', ()=>{
  gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('cssReload', ()=>{
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});


gulp.task('watch',()=>{
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['src/js/*.js'], ['jsReload']);
  gulp.watch(['src/css/*.css'], ['cssReload']);
});


gulp.task('js',()=>{
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});


gulp.task('build', ['js','html']);
gulp.task('default', [
  'connect','html','jsReload',
  'cssReload','watch'
]);
