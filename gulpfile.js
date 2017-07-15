const gulp = require('gulp'),
      koutoSwiss = require('kouto-swiss'),
      stylus = require('gulp-stylus'),
      browserSync = require('browser-sync').create(),
      htmlmin = require('gulp-htmlmin'),
      clean = require('gulp-clean'),
      runSequence = require('run-sequence'),
      reload = browserSync.reload,
      jeet = require('jeet');

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('stylus', function() {
  gulp.src('styl/main.styl')
    .pipe(stylus({
      use: [koutoSwiss(), jeet()],
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
      baseDir: './dist'
    }
  })
})

gulp.task('images', function() {
  return gulp.src('./images/*.{png, jpg}')
    .pipe(gulp.dest('dist/images/'));
})

gulp.task('watch', function () {
	gulp.watch('styl/**/*.styl', ['stylus']).on('change', reload);
	gulp.watch('*.html', ['htmlmin']).on('change', reload);
});

gulp.task('default', function(cb) {
  return runSequence('clean', ['stylus', 'htmlmin', 'images', 'watch',  'serve'], cb);
});
