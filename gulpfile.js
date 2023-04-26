const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const nodemon = require('gulp-nodemon');

gulp.task('server', function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["dist/**/*.*"],
        port: 7000,
	});
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest("./dist/js"));
  });

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"));
});

gulp.task('nodemon', function (cb) {
	
	let started = false;
	
	return nodemon({
		script: 'server.js',
        ext: 'js css html'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'html', 'images', 'nodemon'));