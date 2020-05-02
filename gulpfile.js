var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', () => {
    var tsResult = tsProject.src().pipe(tsProject());

    return tsResult.pipe(gulp.dest('./build/'));
});

gulp.task('minify', () => {
    return gulp
        .src(['build/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});
