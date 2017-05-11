// including plugins
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var psi = require('psi');
var minifyHtml = require('gulp-minify-html');

gulp.task('default', function() {

  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('/index.html', ['minify-html']);

  browserSync.init({
		server: {
			baseDir: "./dist"
		}
	}, function(err, bs) {
		ngrok.connect(bs.options.get('port'), function(err, url) {
      site = url;
			console.log(' -------------------------------------');
      console.log(url);
			//plugins.util.log('\r', '      NGROK:', plugins.util.colors.magenta(url));
			console.log(' -------------------------------------');
		});
	});
});


gulp.task('psi-desktop', function () {
  var site = process.argv[4];
  console.log(site);
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'desktop',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
 });

gulp.task('psi-mobile', function () {
  var site = process.argv[4];
  console.log(site);
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
 });

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('copy-images', function() {
    gulp.src('img/*')
      .pipe(gulp.dest('./dist/img'))
});

gulp.task('minify-html', function() {
    gulp.src('./index.html')
      .pipe(minifyHtml())
      .pipe(gulp.dest('./dist'))
});
