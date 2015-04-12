module.exports = function(grunt) {
	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		includes: {
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
			fields: {
				src: ['build/fieldTypes/*.html'],
				dest: 'build/includes/fieldTypes.inc.html',
				options: {
					separator: '\n\n\t<hr/>\n\n\n'
				}
			},
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
			core: {
				files: 'build/*.html',
				tasks: ['concat','includes']
			}
		}
	});

	grunt.registerTask('default',['watch']);
};