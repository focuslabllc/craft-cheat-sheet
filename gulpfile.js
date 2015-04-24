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
    include = require('gulp-include'),
    replace = require('gulp-replace');


/*
 We occasionally need to delete the generated files
 so we have a 'clean' task to knock this out.
*/
gulp.task('clean', function(){
	del([
		'downloads',
		'./src/includes/*.html',
		'./src/includes/*.js',
		'./src/includes/*.css',
		'!./src/includes/twigSetup*'
		]);
});



/*
 We'll have a few js files to keep dev change sane so we're just gonna
 concatenate them by 2 line breaks for the include within cheatsheet.html
*/
gulp.task('js', function(){
	return gulp.src('./src/js/[!_]*.js')
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(concat('scripts.inc.js', { newLine: '\r\n\r\n' }))
	.pipe(jsmin())
	.pipe(gulp.dest('./src/includes'))
	.on('end', function(){
		gulp.start('includes');
	});
});



/*
 FieldType sample code is broken down into one fieldtype per file for ease of
 management and contribution Each file starts with a comment block that we don't
 need in the final block of code snippets. We'll concatenate all fieltype
 samples and remove top-most comment blocks that follow a particular pattern.
*/
gulp.task('fieldTypes', function(){
	return gulp.src('./src/fieldTypes/[!_]*.html')
	.pipe(plumber())
	.pipe(concat('fieldTypes.inc.html', { newLine: '\r\n\r\n' }))
	.pipe(replace(/\{#-?(.|\n)*?-?#\}\s+\{%-? macro/g, '{%- macro'))
	.pipe(gulp.dest('./src/includes'))
	.on('end', function(){
		gulp.start('includes');
	});
});



// Nothin special here. Just good ole Sass compiling
gulp.task('sass', function(){
	return gulp.src('./src/sass/*.scss')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename('styles.inc.css'))
	.pipe(gulp.dest('./src/includes/'))
	.on('end', function(){
		gulp.start('includes');
	});
});



/*
 Ahh, the include makes things much prettier and easier to work on. This is
 basically just for convenience and restricting changes to single files while
 working on the template.
*/
gulp.task('includes', function(){
	gulp.src('./src/cheatsheet.html')
		.pipe(plumber())
		.pipe(include())
		.pipe(gulp.dest('./downloads/'))
		.pipe(notify('Cheat Sheet file created.'));
	gulp.src('./src/index.html')
		.pipe(plumber())
		.pipe(include())
		.pipe(gulp.dest('./'))
		.pipe(notify('Index file created.'));
});



// Some files need to be placed on a remote server. Gather those.
gulp.task('prod', function(){
	gulp.src(['./src/js/vendor/*', './img/*'])
	.pipe(plumber())
	.pipe(gulp.dest('./remote_assets/'))
	.pipe(notify('Production file prepped: <%= file.relative %>'));
});



// The magic of watching files for changes
gulp.task('watch', function(){
	gulp.watch('./src/js/[!_]*.js', ['js']);
	gulp.watch('./src/sass/*.scss', ['sass']);
	gulp.watch('./src/fieldTypes/[!_]*.html', ['fieldTypes']);
	gulp.watch(['./src/*.html', './src/includes/twigSetup.inc.html'], ['includes']);
});



// Just a simple build-only task
gulp.task('build', ['clean'], function(){
	gulp.start('js', 'sass', 'fieldTypes');
});


/*
 Default is to run our tasks as though they've never been run before,
 then watch for changes as we go.
*/
gulp.task('default', function(){
	gulp.start('build', 'watch');
});