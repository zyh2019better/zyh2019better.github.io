/**
 * 定义源目录和输出目录
 * */
var app={
    'appSrc':'src/',
    'appBuild':'build/',
    'appDist':'dist/',
    'appPort':9999,
}

var gulp = require('gulp');
/*导入gulp-less插件*/
var less = require('gulp-less');
/*导入gulp-cssmin插件*/
var cssmin = require('gulp-cssmin');
/*导入gulp-concat插件*/
var concat = require('gulp-concat');
/*导入gulp-uglify 插件*/
var uglify = require('gulp-uglify');
/*导入gulp-imagemin 插件*/
var imagemin = require('gulp-imagemin');
/*导入gulp-open插件*/
var open = require('gulp-open');
/*导入gulp-connect插件*/
var connect = require('gulp-connect');


/**
 * 1.注册了一个html的任务
 * */
gulp.task('html', function() {
    /**
     * 意思是读取src下所有的.html文件
     * ** ： 代表是src下的任意目录, 0个或者多个
     * */
    gulp.src(app.appSrc+'**/*.html')  /*读取index.html文件*/
        .pipe( gulp.dest(app.appBuild))  /*将读取的文件写到build目录（没有会自动新建）*/
        .pipe( gulp.dest(app.appDist))  /*再将读取的文件写到dist目录（没有会自动新建）*/
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
});

/**
 * 2.注册了一个less的任务
 * */
gulp.task('less', function() {
    /**
     * 意思是读取src/style/index.less文件( 包含其中使用@import依赖文件 )
     * */
    gulp.src([app.appSrc+'style/index.less',app.appSrc+'style/category.less'])  /*less文件*/
        .pipe( less() )  /*将读取的 less文件 转成 css 文件 */
        // .pipe( concat('main.css') )  /*将读的css文件 合并成一个main.css文件 */
        .pipe( gulp.dest(app.appBuild+'style'))  /*将读取的css文件写到build目录（没有会自动新建）*/
        .pipe( cssmin() ) /*将读取的 css文件 压缩 */
        .pipe( gulp.dest(app.appDist+'style'))  /*再将读取压缩过的css文件写到dist目录（没有会自动新建）*/
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
});

/**
 * 3.注册了一个js的任务
 * */
gulp.task('js', function() {
    /**
     * 意思是读取src/js下所有的.js文件
     * ** ： 代表是src下的任意目录, 0个或者多个
     * */
    gulp.src(app.appSrc+'js/**/*.js')  /*读取.js文件*/
    // .pipe( concat('index.js') )  /*将读取所有的js文件 合并成一个index.js文件 */
        .pipe( gulp.dest(app.appBuild+"js"))  /*将读取的文件写到build/js目录（没有会自动新建）*/
        .pipe( uglify() )  /*将读取js文件并压缩js文件 */
        .pipe( gulp.dest(app.appDist+"js"))  /*再将读取压缩后的文件写到dist/js目录（没有会自动新建）*/
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
});

/**
 * 4.注册了压缩图片的任务
 * */
gulp.task('image', function() {
    /**
     * 意思是读取src/image下所有的图片文件
     * ** ： 代表是src下的任意目录, 0个或者多个
     * */
    gulp.src(app.appSrc+'images/**/*')  /*读取图片文件*/
        .pipe( gulp.dest(app.appBuild+'images'))  /*将读取所有的图片文件写到build目录（没有会自动新建）*/
        .pipe( imagemin() )  /*将读取所有的图片文件进行压缩 */
        .pipe( gulp.dest(app.appDist+'images'))  /*再将读取压缩后的文件写到dist目录（没有会自动新建）*/
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
});

/**
 *  5.注册一个lib任务（ 把 bower下载的前端框架放到我们项目当中 ）
 * */
gulp.task('lib',function () {
    gulp.src(['bower_components/**/*.js','bower_components/**/*.css'])
        .pipe(gulp.dest(app.appBuild+'libs'))
        .pipe(gulp.dest(app.appDist+'libs'))
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
});

/*
*   8.注册一个json任务，可以实现ajax数据交互
* */
gulp.task('json',function () {
    gulp.src(app.appSrc+'data/**/*.json')
        .pipe(gulp.dest(app.appBuild+'data'))
        .pipe(gulp.dest(app.appDist+'data'))
        .pipe(connect.reload()) //当内容发生改变时， 重新加载。
})


/**
 * 6.注册一个build任务（同时执行多个任务）
 *   当前 bulid 时，会自动把数组当中的所有任务给执行。
 * */
gulp.task('build',['html','less','js','image','lib','json']);

/**
 * 7.定义server任务
 * 搭建一个服务器。设置运行的构建目录
 * */
gulp.task('server',['build'],function () {
    /*1.设置web服务器*/
    connect.server({
        root:[app.appBuild],//服务器管理/运行哪个目录(默认是项目的根目录)
        livereload:true,  //是否热更新。
        port:app.appPort  //指定web服务的端口号（默认是8080）
    })

    /*2.gulp监视文件，并且可以在文件发生改动时候做一些事情.
    *  参数一：监视的文件
    *  参数二: 在文件变动后执行的一个task任务
    * */
    gulp.watch(['bower_components/**/*'], ['lib']);
    gulp.watch(app.appSrc+'**/*.html',['html']);
    gulp.watch(app.appSrc+'js/**/*.js',['js']);
    gulp.watch(app.appSrc+'images/**/*',['image']);
    gulp.watch(app.appSrc+'style/**/*.less',['less']);
    gulp.watch(app.appSrc+'data/*.json',['json']);

    //open相当于浏览器，下面是通过浏览器打开百度网址
    var options = {
        uri: '127.0.0.1:'+app.appPort,
        app: 'chrome'
    };
    gulp.src('')

        .pipe(open(options));
});


/**
 * 8.定义默认任务
 *  直接执行gulp 会调用该任务
 * */
gulp.task('default',['server']);
