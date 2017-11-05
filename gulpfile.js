const gulp = require('gulp'),
      koutoSwiss = require('kouto-swiss'),
	    uglify      = require('gulp-uglify'),
      rupture = require('rupture'),
      stylus = require('gulp-stylus'),
      browserSync = require('browser-sync').create(),
      htmlmin = require('gulp-htmlmin'),
      clean = require('gulp-clean'),
      runSequence = require('run-sequence'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      buffer = require('vinyl-buffer'),
      source = require('vinyl-source-stream'),
      reload = browserSync.reload;

gulp.task('js', function () {
  var bundler = browserify({
    entries: 'src/js/app.js',
    debug: true
  });
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', function (err) { console.error(err); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('stylus', function() {
  gulp.src('src/styl/main.styl')
    .pipe(stylus({
      use: [koutoSwiss(), rupture()],
      compress: true
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('htmlmin', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'));
})

gulp.task('watch', function () {
	gulp.watch('src/styl/**/*.styl', ['stylus']).on('change', reload);
	gulp.watch('src/js/**/*.js', ['js']).on('change', reload);
	gulp.watch('*.html', ['htmlmin']).on('change', reload);
});

gulp.task('default', function(cb) {
  return runSequence('clean', ['stylus', 'js', 'htmlmin', 'images', 'watch',  'serve'], cb);
});
