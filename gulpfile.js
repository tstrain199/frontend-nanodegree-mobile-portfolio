var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var psi = require('psi');

gulp.task('default', function() {

  gulp.watch('sass/**/*.scss', ['styles']);

  browserSync.init({
		server: {
			baseDir: "./"
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
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});
