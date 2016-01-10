var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	del = require('del'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('default', ['webserver']);


/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by watchify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watchify', [], function () {
	var b = browserify({
		entries: './src/app.js',
		debug: true,
		//paths: ['./src/controllers', './src/services', './src/directives'],
		//		transform: [ngAnnotate]
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: true // required to be true only for watchify
	});

	w = watchify(b);

	function rebundle() {
		w.bundle()
			.on('error', gutil.log)
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({
				loadMaps: true
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./src/'))

	}
	w.on('update', rebundle);
	w.on('log', function (msg) {
		gutil.log(msg)
	})
	return rebundle();

});


/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('webserver', ['watchify'], function () {
	gulp.src('.')
		.pipe(webserver({
			livereload: false,
			port: 3000,
			https: false,
			host: 'localhost',
			directoryListing: false,
			open: "http://localhost:3000/"
		}));
});