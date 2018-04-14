const gulp = require('gulp'); // Сборщик
const sass = require('gulp-sass'); // Библиотека SASS
const browserSync = require('browser-sync').create(); // Библиотека LiveReload
const plumber = require('gulp-plumber');

// Задача запуска сервера и отслеживание файлов
// При каждом изменении в файлах будут запускатся соотвецтвующие задачи
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: "."
    });
    gulp.watch(["./src/scss/*.scss", "./src/scss/**/*.scss"], ['sass']);
    gulp.watch('./src/img/*', ['img']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Транскомпиляция SCSS в СSS
gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss') // Берем исходные файлы
   .pipe (plumber())
    .pipe(sass({includePaths: require('node-normalize-scss').includePaths})) // Транскомпиляция в CSS
    .pipe(gulp.dest('./dist/css/')) // Складывает их в папку dist
    .pipe(browserSync.stream()); // Перезагружаем браузер
});

// Gulp задача по умолчанию
gulp.task('default', ['sass', 'server']);
