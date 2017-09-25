const gulp = require('gulp'),
      koutoSwiss = require('kouto-swiss'),
      rupture = require('rupture'),
      stylus = require('gulp-stylus'),
      browserSync = require('browser-sync').create(),
      htmlmin = require('gulp-htmlmin'),
      clean = require('gulp-clean'),
      runSequence = require('run-sequence'),
      reload = browserSync.reload;

gulp.task('clean', function() {
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('stylus', function() {
  gulp.src('styl/main.styl')
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
  return gulp.src('./images/*')
    .pipe(gulp.dest('dist/images/'));
})

gulp.task('watch', function () {
	gulp.watch('styl/**/*.styl', ['stylus']).on('change', reload);
	gulp.watch('*.html', ['htmlmin']).on('change', reload);
});

gulp.task('default', function(cb) {
  return runSequence('clean', ['stylus', 'htmlmin', 'images', 'watch',  'serve'], cb);
});
