var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
  gulp.src(['!public/app/app.js', 'public/app/stage.js','public/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/app/'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('public/app/**/*.js', ['js'])
})

gulp.task('go', ['watch']);