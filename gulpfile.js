var gulp 	= require('gulp'),
    uglify 	= require('gulp-uglify'),
    concat	= require('gulp-concat'),
    stylus 	= require('gulp-stylus'),
    ejs 	= require('gulp-ejs'),
    browsersync = require('browser-sync').create();

gulp.task('uglify', function () {
	return gulp.src('lib/js/**.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('wwwroot/js'));
});

gulp.task('stylus', function () {
	return gulp.src('lib/styl/**.styl')
		.pipe(concat('main.min.styl'))
		.pipe(stylus())
		.pipe(gulp.dest('wwwroot/css'));
});

gulp.task('serve', ['uglify', 'stylus'], function () {
	browsersync.init({
		server: 'wwwroot'
	});

	gulp.watch('lib/js/**.js', ['uglify']).on('change', browsersync.reload);
	gulp.watch('lib/styl/**.styl', ['stylus']).on('change', browsersync.reload);
});

gulp.task('default', ['uglify', 'stylus']);
