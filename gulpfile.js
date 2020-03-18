const gulp = require("gulp");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const glob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();

const mode = require("gulp-mode")({
	modes: ["production", "development"],
	default: "development",
	verbose: false
});

const paths = {
	root: "dist/",
	index: "./index.html",
	scssSrc: "./scss/*.scss",
	jsSrc: "./js/*.js",
	outCss: "dist/css",
	outJs: "dist/js"
};

function browserSyncFunc(done) {
	browserSync.init({
		server: {
			baseDir: paths.root
		},
		port: 8000,
		reloadOnRestart: true
	});

	done();
}

function indexFunc() {
	return gulp
		.src(paths.index)
		.pipe(gulp.dest(paths.root))
		.pipe(browserSync.stream());
}

function sassFunc() {
	return gulp
		.src(paths.scssSrc, {
			sourcemaps: true
		})
		.pipe(
			plumber({
				errorHandler: notify.onError("<%= error.message %>")
			})
		)
		.pipe(glob())
		.pipe(
			sass({
				outputStyle: "compressed"
			})
		)
		.pipe(gulp.dest(paths.outCss), {
			sourcemaps: "./sourcemaps"
		})
		.pipe(
			autoprefixer({
				cascade: false
			})
		)
		.pipe(gulp.dest(paths.outCss), {
			sourcemaps: "./sourcemaps"
		})
		.pipe(browserSync.stream());
}

function jsFunc() {
	return gulp
		.src(paths.jsSrc, {
			sourcemaps: true
		})
		.pipe(
			plumber({
				errorHandler: notify.onError("<%= error.message %>")
			})
		)
		.pipe(babel())
		.pipe(mode.production(uglify()))
		.pipe(gulp.dest(paths.outJs));
}

function watchFunc(done) {
	gulp.watch(paths.scssSrc, gulp.parallel(sassFunc));
	gulp.watch(paths.jsSrc, gulp.parallel(jsFunc));
	gulp.watch(paths.index, gulp.parallel(indexFunc));

	done();
}

gulp.task(
	"development",
	gulp.parallel(browserSyncFunc, watchFunc, sassFunc, jsFunc, indexFunc)
);

gulp.task("production", gulp.parallel(sassFunc, jsFunc, indexFunc));
