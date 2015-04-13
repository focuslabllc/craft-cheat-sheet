module.exports = function(grunt) {
	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		includes: {
			// Ahh, the include makes things much prettier and
			// easier to work on. This is basically just for
			// convenience and restricting changes to single
			// files while working on the template.
			files: {
				src: ['build/*.html'],
				dest: './',
				flatten: true,
				cwd: '.',
				options: {
					silent: true,
					includePath: 'build/includes'
				}
			}
		},
		concat: {
			// Combining our fieldType code samples into a single "include"
			// for the final cheatsheet.html twig template
			// Separating the fieltTypes by an <hr/> for now
			fields: {
				src: ['build/fieldTypes/*.html'],
				dest: 'build/includes/fieldTypes.inc.html',
				options: {
					separator: '\n\n\t<hr/>\n\n\n'
				}
			},
			// We'l have a few js files to keep dev change sane
			// so we're just gonna concatenate them by 2 line breaks
			// for the include within cheatsheet.html
			js: {
				src: ['build/js/ga.js', 'build/js/core.js'],
				dest: 'build/includes/scripts.inc.js',
				options: {
					separator: '\n\n'
				}
			},
		},
		sass: {
			options: {
				style: 'compressed',
				sourcemap: 'none'
			},
			dist: {
				files: [{
					expand: true,
					flatten: true,
					src: 'build/sass/styles.scss',
					dest: 'build/includes/',
					ext: '.inc.css'
				}]
			}
		},
		replace: {
			// within the fieldType .html files we have code blocks
			// in twig format to note certain details while working
			// on the sample code. I don't this in the final
			// cheatsheet.html file though, so we strip them out
			// Hopefully no one jacks up the format and misses my
			// pattern matching so beautifully written below.
			comments: {
				src: ['build/includes/fieldTypes.inc.html'],
				overwrite: true,
				replacements: [{
					from: /\{#-?(.|\n)*?-?#\}\s+\{% case/g,
					to: '{% case'
				}]
			}
		},
		watch: {
			css: {
				files: 'build/**/*.scss',
				tasks: ['sass', 'includes']
			},
			js: {
				files: 'build/js/*.js',
				tasks: ['concat:js', 'includes']
			},
			fieldTypes: {
				files: 'build/fieldTypes/*.html',
				tasks: ['concat:fields', 'replace', 'includes']
			},
			coreHTML: {
				files: 'build/*.html',
				tasks: ['includes']
			}
		}
	});

	grunt.registerTask('default',['watch']);
};