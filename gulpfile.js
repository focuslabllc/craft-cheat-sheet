var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    del     = require('del'),
    rename  = require('gulp-rename'),
    notify  = require('gulp-notify'),
    jsmin   = require('gulp-jsmin'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    replace = require('gulp-replace');



var srcDir = './src/assets/src',
    distDir = './src/assets/dist';


/*
 We occasionally need to delete the generated files
 so we have a 'clean' task to knock this out.
*/
gulp.task('clean', function(){
	return del([
		distDir + '/js/*.js',
		distDir + '/css/*.css'
	]);
});



/*
 We'll have a few js files to keep dev change sane so we're just gonna
 concatenate them by 2 line breaks
*/
gulp.task('js', function(){
	return gulp.src([srcDir + '/js/vendor/[!_]*.js', srcDir + '/js/[!_]*.js'])
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(concat('scripts.js', { newLine: '\r\n\r\n' }))
	.pipe(jsmin())
	.pipe(gulp.dest(distDir + '/js'))
});



/*
 FieldType sample code is broken down into one fieldtype per file for ease of
 management and contribution Each file starts with a comment block that we don't
 need in the final block of code snippets. We'll concatenate all fieltype
 samples and remove top-most comment blocks that follow a particular pattern.
*/
gulp.task('fieldTypes', function(){
	return gulp.src('./src/templates/frontEnd/_includes/_fieldMacros/*.twig')
	.pipe(plumber())
	.pipe(concat('fields.twig', { newLine: '\r\n\r\n' }))
	.pipe(gulp.dest('./src/templates/frontEnd/_includes/_coreMacros'))
	.on('end', function(){
		gulp.series('buildMacro');
	});
});



/*
 This task takes our three main macro files, separated just for easy file
 editing during development, and concatenates them as a single twig macro
 file that can be included in a single scope
*/
gulp.task('buildMacro', function(){
	return gulp.src('./src/templates/frontEnd/_includes/_coreMacros/*.twig')
	.pipe(plumber())
	.pipe(concat('fieldMacros.twig', { newLine: '\r\n\r\n' }))
	.pipe(gulp.dest('./src/templates/frontEnd/_includes/'))
});



// Nothin special here. Just good ole Sass compiling
gulp.task('sass', function(){
	return gulp.src(srcDir + '/sass/*.scss')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(rename('styles.css'))
	.pipe(gulp.dest(srcDir + '/includes/'))
	.pipe(gulp.dest(distDir + '/css'))
});



// The magic of watching files for changes
gulp.task('watch', function(){
	gulp.watch(srcDir + '/js/[!_]*.js', gulp.parallel(['js']));
	gulp.watch(srcDir + '/sass/*.scss', gulp.parallel(['sass']));
	gulp.watch('./src/templates/frontEnd/_includes/_fieldMacros/[!_]*.twig', gulp.parallel(['fieldTypes']));
});



// Just a simple build-only task
gulp.task('build', gulp.parallel('clean', 'js', 'sass', 'fieldTypes', function(done){
	done();
}));


/*
 Default is to run our tasks as though they've never been run before,
 then watch for changes as we go.
*/
gulp.task('default', gulp.series('build', 'watch'));
