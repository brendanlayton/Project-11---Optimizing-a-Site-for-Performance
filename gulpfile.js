'use strict';

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),
		del = require('del'),
		image = require('gulp-image'),
		tinypng = require('gulp-tinypng'),
		imagemin = require('gulp-imagemin'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		spritesmith = require('gulp.spritesmith'),
		buffer = require('vinyl-buffer'),
		csso = require('gulp-csso'),
		merge = require('merge-stream'),
		inlinesource = require('gulp-inline-source'),
		htmlmin = require('gulp-htmlmin');
	//	gzip = require('gulp-gzip');

gulp.task('sprite', function () {
	// Generate spritesheet
  var spriteData = gulp.src('img/avatars/*.jpg').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));

	// Pime image stream through image optimizer and onto disk
	 var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('img/avatars'));
	
	// Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(csso())
		.pipe(gulp.dest('css'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
	
});

gulp.task('concatScripts', function() {
	return gulp.src([
		'js/jquery.js',
		//'js/lazyload.transpiled.min.js',
		'js/modal.js'])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('inlinesource', function () {
    return gulp.src('index-dev.html')
        .pipe(inlinesource())
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('concatStyles', function() {
	return gulp.src([
		'css/normalize.css',
		'css/footer.css',
		'css/modals.css',
		'css/photo-grid.css',
		'css/sprite.css'])
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('css'));
});

gulp.task('process-css', ['concatStyles'], function() {
	var plugins = [
		autoprefixer({
			browsers: ['last 3 version']
		})
	];
	return gulp.src('css/styles.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('css'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
		return gulp.src('js/scripts.js')
			.pipe(uglify()).on('error', function(e){
            console.log(e);
         })
			.pipe(rename('scripts.min.js'))
			//.pipe(gzip())
			.pipe(gulp.dest('js'));
});

gulp.task('minifyStyles', ['process-css'], function() {
	return gulp.src('css/styles.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('styles.min.css'))
		//.pipe(gzip())
		.pipe(gulp.dest('css'));
});


gulp.task('image', function() {
	gulp.src('img/**')
		.pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
	}))
	.pipe(gulp.dest('img'));
});

gulp.task('tinypng', function() {
	gulp.src('img/**')
	.pipe(tinypng('a-8vFp7wuFQXMrFMrH5LfEI8uGP32lCB'))
	.pipe(gulp.dest('img'));
});
 
gulp.task('imageMin', () =>
    gulp.src('img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('clean', function() {
	del(['dist', 'js/scripts*.js', 'css/styles*.css']);
});


gulp.task('build', ['minifyScripts', 'minifyStyles', 'inlinesource'], function() {
	return gulp.src(['css/styles.min.css', 'js/scripts.min.js', 'index.html', 'img/**'], { base: './'})
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});