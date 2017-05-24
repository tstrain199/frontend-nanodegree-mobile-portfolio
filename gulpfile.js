// including plugins
var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var ngrok         = require('ngrok');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var psi           = require('psi');
var minifyHtml    = require('gulp-minify-html');
var minifyCss     = require('gulp-minify-css');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');

gulp.task('default', function() {

  gulp.watch('./sass/**/*.scss', ['styles', 'minify-css', 'images']);
  gulp.watch('./index.html', ['minify-html']);
  gulp.watch('./js', ['uglify-js']);

  browserSync.init({
		server: {
			baseDir: "./dist"
		}
	}, function(err, bs) {
		ngrok.connect(bs.options.get('port'), function(err, url) {
      site = url;
			console.log(' -------------------------------------');
      console.log(url);
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
	gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('minify-html', function() {
    gulp.src('./*.html')
      .pipe(minifyHtml())
      .pipe(gulp.dest('./dist'))
});

gulp.task('minify-css', function() {
    gulp.src('./css/*')
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/css'))
});

gulp.task('uglify-js', finction() {
  gulp.src('./js/*')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('images', function() {
     gulp.src('./img/*')
       .pipe(imagemin())
       .pipe(gulp.dest('./dist/img'))
});

gulp.task('build',['styles', 'minify-html', 'minify-css',
                    'uglify-js', 'images'] function(){
});
