const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// exports.default = gulp.parallel(funcaoPadrao, dizOi);
// exports.dizOi = dizOi;
// exports.sass = compilaSass;
exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/styles/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript))
    gulp.watch('./source/styles/*', {ignoreInitial: false}, gulp.series(comprimeImagens))
};
// exports.javascript = comprimeJavaScript;
// exports.images = comprimeImagens;


// function funcaoPadrao(callback) {
//     setTimeout(function() {
//         console.log("Executando via Gulp");
//         callback();
//     }, 2000)
// }

// function dizOi(callback) {
//     console.log("Olá Gulp");
//     dizTchau();
//     callback();
// }

// function dizTchau() {
//     console.log("Tchau Gulp");
// }