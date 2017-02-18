let gulp       = require('gulp');
let connect    = require('gulp-connect');
let sourcemaps = require('gulp-sourcemaps');
let source     = require('vinyl-source-stream');
let buffer     = require('vinyl-buffer');
let browserify = require('browserify');
let babel      = require('babelify');

function compile() {
  console.log('-> bundling...');
  browserify('./source.js', { debug: true }).transform(babel, {presets: ["es2017"]})
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
}

gulp.task('connect', () => {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('watch', () => {
  gulp.watch(['./*.js'], () => { return compile(); });
});

gulp.task('build', () => { return compile(); });

gulp.task('default', ['connect', 'build', 'watch']);
