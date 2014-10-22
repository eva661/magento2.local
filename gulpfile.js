(function() {
    'use strict';

// Include gulp
    var gulp = require('gulp');

// Include Our Plugins
    var jshint = require('gulp-jshint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');

    // Lint Task
    //Our lint task checks any JavaScript file in our js/ directory and makes sure there are no errors in our code.
    gulp.task('lint', function() {
        return gulp.src('skin/frontend/default/amigo/js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    // Compile Our Sass
    //compiles any of our Sass files in our scss/ directory into .css and saves the compiled .css file in our css/ directory
    gulp.task('sass', function() {
        return gulp.src('skin/frontend/default/amigo/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('skin/frontend/default/amigo/css'));
    });

    // Concatenate & Minify JS
    // task concatenates all JavaScript files in our js/ directory and saves the ouput to our jsmin directory. Then gulp
    // takes that concatenated file, minifies it, renames it and saves it to the jsmin/ directory alongside
    // the concatenated file
    gulp.task('scripts', function() {
        return gulp.src('skin/frontend/default/amigo/js/*.js')
            .pipe(concat('skin/frontend/default/amigo/jsmin/all.js'))
            .pipe(gulp.dest('skin/frontend/default/amigo/jsmin/'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('skin/frontend/default/amigo/jsmin/'));
    });

    // Watch Files For Changes
    //The watch task is used to run tasks as we make changes to our files. As you write code and modify your files,
    // the gulp.watch() method will listen for changes and automatically run our tasks again
    // so we don't have to continuously jump back to our command-line and run the gulp command each time.
    gulp.task('watch', function() {
        gulp.watch('skin/frontend/default/amigo/js/*.js', ['lint', 'scripts']);
        gulp.watch('skin/frontend/default/amigo/scss/*.scss', ['sass']);
    });

// Default Task
    gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
})();
