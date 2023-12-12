const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

const paths = {
    root: './dist',
    templates: {
        pages: './src/views/pages/*.html',
        src: './src/views/**/*.html',
        dest: './dist'
    },
    styles: {
        main: './src/assets/styles/main.scss',
        src: './src/assets/styles/**/*.scss',
        dest: './dist/assets/styles'
    },
    scripts: {
        src: './src/assets/scripts/*.js',
        dest: './dist/assets/scripts/'
    }
}

// слежка
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
}

// следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest(paths.styles.dest))
};

// webpack
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(paths.scripts.dest));
};

gulp.task('default', gulp.series(
    [gulp.parallel(styles, templates, scripts), gulp.parallel(watch, server)]
));
