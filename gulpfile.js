var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');

gulp.task('default', function() {

  browserSync.init({
		server: {
			baseDir: "./public"
		}
	}, function(err, bs) {
		ngrok.connect(bs.options.get('port'), function(err, url) {
			console.log(' -------------------------------------');
			plugins.util.log('\r', '      NGROK:', plugins.util.colors.magenta(url));
			console.log(' -------------------------------------');
		});
	});

  gulp.task('default', ['styles'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);// watch tasks go here

});
