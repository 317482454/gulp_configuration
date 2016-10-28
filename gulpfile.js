
var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    rev = require('gulp-rev'),
    minifycss = require('gulp-minify-css'),
    revCollector = require('gulp-rev-collector');

var WatchSrc=[
    '**/*.html',
    '**/*.css',
    '**/*.js'
];
gulp.task('Less', function () {
    gulp.src(['less/**/*.less'])
        .pipe(less())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});
gulp.task('less', function () {
    gulp.watch('less/**/*.less', ['Less','change']);

});

gulp.task('brower-sync',function(){
    browserSync.init({
        server:{
            baseDir:"/",

        }
    });
});


gulp.task('load',function(){
    browserSync.init({
        proxy: "192.168.10.167:8181",//代理
        /*port: 81*/
    });
})

gulp.task('change', function () {
    gulp.src(['rev/**/*.json', '**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(''));
});

gulp.task('JS', function () {
    gulp.src(['js/**/*.js'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});
gulp.task('js', function () {
    gulp.watch('js/**/*.js', ['JS','change']);

});


gulp.task('default',['load','js','less'],function(){
    gulp.watch('**/*.html').on("change", browserSync.reload);
});