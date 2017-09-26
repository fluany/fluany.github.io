const gulp = require('gulp'),
      koutoSwiss = require('kouto-swiss'),
	    plumber     = require('gulp-plumber'),
	    uglify      = require('gulp-uglify'),
	    concat      = require('gulp-concat'),
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

gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({stream:true}))
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
