module.exports = function(grunt) {
	"use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		includes: {
			files: {
				src: ['build/*.html','build/*.css','build/*.js'],
				dest: './',
				flatten: true,
				cwd: '.',
				options: {
					silent: false,
					includePath: 'build/includes'
				}
			}
		},
		concat: {
			dist: {
				src: ['build/js/ga.js', 'build/js/core.js'],
				dest: 'build/includes/scripts.inc.js',
				options: {
					separator: '\n\n'
				}
			}
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
		watch: {
			css: {
				files: 'build/**/*.scss',
				tasks: ['sass', 'includes']
			},
			js: {
				files: 'build/**/*.js',
				tasks: ['concat', 'includes']
			},
			html: {
				files: 'build/**/*.html',
				tasks: ['includes']
			}
		}
	});

	// grunt.registerTask('css',['watch']);
	// grunt.registerTask('svg',['svgmin']);
	grunt.registerTask('default',['watch']);
};