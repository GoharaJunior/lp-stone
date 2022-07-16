const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// compila o sass e adiciona autoprefixer, dando refresh na página
function compilaSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer({
        overrideBrowserlist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// função do browser-sync
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// observa as alterações em scss e html
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Chamadas de tarefas
gulp.task('sass', compilaSass);
gulp.task('browser-sync', browser);
gulp.task('watch', watch);

// tarefas default que executa o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));