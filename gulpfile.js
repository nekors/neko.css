const { src, dest, series } = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const rename = require('gulp-rename');

function scss() {
  return src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/'))
}

function minify() {
  return src(['./dist/**/*.css', '!./dist/**/*.min.css'])
    .pipe(
      require('gulp-autoprefixer')({
        cascade: false
      })
    )
    .pipe(require('gulp-cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('./dist'))
}

function purge() {
  return src('./dist/**/*.min.css')
    .pipe(require('gulp-purgecss')({
      content: ['../templates/**/*.html']
    }))
    .pipe(dest('./dist'))
}

exports.build = series(scss, minify);
exports.purge = purge;
if (process.env.NODE_ENV === 'production') {
  exports.default = series(scss, minify, purge);
} else {
  exports.default = series(scss);
}