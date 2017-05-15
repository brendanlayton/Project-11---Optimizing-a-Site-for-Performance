'use strict';

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),
		del = require('del'),
		image = require('gulp-image'),
		tinypng = require('gulp-tinypng');

gulp.task('concatScripts', function() {
	return gulp.src([
		'js/jquery.js',
		'js/fastclick.js',
		'js/foundation.js',
		'js/foundation.equalizer.js',
		'js/foundation.reveal.js'])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('concatStyles', function() {
	return gulp.src([
		'css/normalize.css',
		'css/foundation.css',
		'css/basics.css',
		'css/footer.css',
		'css/hero.css',
		'css/menu.css',
		'css/modals.css',
		'css/photo-grid.css'])
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('css'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
		return gulp.src('js/scripts.js')
			.pipe(uglify())
			.pipe(rename('scripts.min.js'))
			.pipe(gulp.dest('js'));
});

gulp.task('minifyStyles', ['concatStyles'], function() {
  return gulp.src('css/styles.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('styles.min.css'))
    .pipe(gulp.dest('css'));
});


//gulp.task('image', function() {
//	gulp.src('img/photos/')
//		.pipe(image({
//      pngquant: true,
//      optipng: false,
//      zopflipng: true,
//      jpegRecompress: false,
//      jpegoptim: true,
//      mozjpeg: true,
//      guetzli: false,
//      gifsicle: true,
//      svgo: true,
//      concurrent: 10
//	}))
//	.pipe(gulp.dest('img/compressed'));
//});

gulp.task('tinypng', function() {
	gulp.src('img/**')
	.pipe(tinypng('a-8vFp7wuFQXMrFMrH5LfEI8uGP32lCB'))
	.pipe(gulp.dest('img'));
});
 
gulp.task('clean', function() {
	del(['dist', 'js/scripts*.js', 'css/styles*.css']);
});


gulp.task('build', ['minifyScripts', 'minifyStyles'], function() {
	return gulp.src(['css/styles.min.css', 'js/scripts.min.js', 'index.html', 'img/**'], { base: './'})
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});