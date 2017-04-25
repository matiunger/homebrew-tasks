var gulp = require('gulp')
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var browserify = require('browserify')
var babel = require('babelify')
var source = require('vinyl-source-stream')


// Style Pre- and Postprocessor
gulp.task('css', function () {
	var procesos = [
		autoprefixer({browsers: ['> 5%', 'ie 8']})
	]
	return gulp.src('./src/app.scss')
		.pipe(sass())
		.pipe(postcss(procesos))
		.pipe(gulp.dest('./public/'))
		//.pipe(browserSync.stream())
})
// Copy files
gulp.task('files', function () {
	gulp.src('src/index.html')
	.pipe(gulp.dest('./public/'))
})
// Bundle Scripts
gulp.task('scripts', function() {
	browserify('./src/index.js')
	.transform(babel, {presets: ["es2015"]})
	.bundle()
	.pipe(source('index.js'))
	.pipe(gulp.dest('public'))

})


// Watch changes
gulp.task('watch', function(){
	gulp.watch('./src/**/*.{scss,css,js}', ['css', 'files','scripts'])
})

// Default Tasks
gulp.task('default', ['css','files','scripts'])