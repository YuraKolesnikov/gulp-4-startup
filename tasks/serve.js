const gulp = require('gulp')

const html = require('./html')
const imageMin = require('./imageMin')
const svgSprite = require('./svgSprite')
const styles = require('./styles')
const scripts = require('./scripts')

const server = require('browser-sync').create()

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
