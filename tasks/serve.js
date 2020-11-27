const gulp    = require('gulp'),
			server  = require('browser-sync').create()

const html      = require('./html'),
			imageMin  = require('./imageMin'),
			svgSprite = require('./svgSprite'),
			styles    = require('./styles'),
			scripts   = require('./scripts')

function readyReload(cb) {
	server.reload()
	cb()
}

module.exports = function serve(cb) {
	server.init({
		server: 'build',
		notify: false,
		open: true,
		cors: true
	})

	gulp.watch('src/pages/*.html', gulp.series(html,  readyReload))
	gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMin, readyReload))
	gulp.watch('src/img/sprite/*.svg', gulp.series(svgSprite, readyReload))
	gulp.watch('src/scss/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
	gulp.watch('src/js/**/*.js', gulp.series(scripts, readyReload))

	return cb()
}
