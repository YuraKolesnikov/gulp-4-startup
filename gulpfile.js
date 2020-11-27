const gulp = require('gulp')

const serve             = require('./tasks/serve')
const html              = require('./tasks/html')
const styles            = require('./tasks/styles')
const scripts           = require('./tasks/scripts')
const fonts             = require('./tasks/fonts')
const imageMin          = require('./tasks/imageMin')
const clean             = require('./tasks/clean')
const svgSprite         = require('./tasks/svgSprite')
const lighthouse        = require('./tasks/lighthouse')

function setMode(isProduction = false) {
	return cb => {
		process.env.NODE_ENV = isProduction ? 'production' : 'development'
		cb()
	}
}

const dev = gulp.parallel(html, styles, scripts, fonts, imageMin, svgSprite)

const build = gulp.series(clean, dev)

module.exports.start = gulp.series(setMode(), build, serve)
module.exports.build = gulp.series(setMode(true), build)

module.exports.lighthouse = gulp.series(lighthouse)
