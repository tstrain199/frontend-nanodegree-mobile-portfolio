// including plugins
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var jsmin = require('gulp-jsmin');
var inlineCss = require('gulp-inline-css');
var del = require('del');

gulp.task('default', ['minify-css', 'inlineCss', 'images', 'minify-js', 'minify-html']);


gulp.task('minify-html', function() {
    gulp.src('./build/*.html')
      .pipe(minifyHtml())
      .pipe(gulp.dest('./dist'))
    gulp.src('./views/*.html')
      .pipe(minifyHtml())
      .pipe(gulp.dest('./dist/views'))
});

gulp.task('minify-css', function() {
    gulp.src('./css/*')
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/css'))
    gulp.src('./views/css/*')
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/views/css'))
});

gulp.task('images', function() {
     gulp.src('./img/*')
       .pipe(imagemin({ progressive: true} ))
       .pipe(gulp.dest('./dist/img'))
     gulp.src('views/images/*')
       .pipe(imagemin({ progressive: true} ))
       .pipe(gulp.dest('./dist/views/images'))
});

gulp.task('minify-js', function() {
    gulp.src('./js/*.js')
      .pipe(jsmin())
      .pipe(gulp.dest('./dist/js'))
    gulp.src('./views/js/*.js')
      .pipe(jsmin())
      .pipe(gulp.dest('./dist/views/js'))
});

gulp.task('inlineCss', function() {
    return gulp.src('./*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
    return del([
        'dist/css/*',
	'dist/img/*',
	'dist/*.html',
	'dist/js/*',
	'dist/views/*.html',
	'dist/views/css/*',
	'dist/views/js/*',
	'dist/views/img/*'
    ]);
});
