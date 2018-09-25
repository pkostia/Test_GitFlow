const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');

gulp.task('sass', function () {
    gulp.src('./src/scss/**/main.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('dist', function () {
    gulp.src('./src/css/**/*.css')
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});
gulp.task('default',['browserSync','sass'], function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});