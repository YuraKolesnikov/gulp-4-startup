const gulp    = require('gulp'),
			plumber = require('gulp-plumber'),
			w3c     = require('gulp-w3c-html-validator'),
			bem     = require('gulp-html-bem-validator')

module.exports = function html(cb) {
	return gulp.src('src/pages/*.html')
		.pipe(plumber())
		.pipe(w3c())
		.pipe(bem())
		.pipe(gulp.dest('build'))
}
