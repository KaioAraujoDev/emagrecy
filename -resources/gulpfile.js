const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline; // Necessário para o gulp-uglify
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const src = {
  js     : ['js/**/*.js'],
  sass   : ['scss-page/**/*.scss'],
  html   : ['../**/*.jsp'],
};

gulp.task('build-css', gulp.series( function() {
  return gulp.src(src.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('../build/css'))
    .pipe(browserSync.stream());
}));

gulp.task('build-js', gulp.series( function() {
  gulp.src(src.js)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('../build/js'))
    .pipe(browserSync.stream());
}));

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "../"
      }
  });
});


gulp.task('watch', gulp.series( function() {
  gulp.watch('scss/**/*.scss', gulp.parallel('build-css'));
  gulp.watch(src.js, gulp.parallel('build-js'));
  gulp.watch(src.html).on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('build-css', 'build-js', 'watch','browser-sync'));
