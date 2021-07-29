var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');

//  watching all css files and updating master css file
gulp.task('styles', () => {
    return gulp.src('./style/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('./style/css/'))
});

//  deleting old css master file
gulp.task('clean', () => {
    return del([
        'style/style.css',
    ]);
});

gulp.task('cleanjs', () => {
    return del([
        'js/script/script.js',
    ]);
});

//  watching all js files and merg them into master file
gulp.task('js', () => {
    return gulp.src('./js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest('./script/'));
});



/// watching for changes and updating coresponding files
gulp.task('watch', () => {
    /// watching scss files
    gulp.watch('style/sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
    
    //  watching js files
    gulp.watch('js/**/*.js', (done) => {
        gulp.series(['cleanjs','js'])(done);
    });

});


/// running tasks
gulp.task('default', gulp.series(['watch']));