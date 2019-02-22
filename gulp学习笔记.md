# gulp学习笔记



## gulp特点
1. 任务化、基于流。

2. gulp原本不支持任何功能，只提供最基础的API。

3. gulp比起grunt更高效（异步多任务），更易于使用，插件高质量。


## gulp常用插件
- gulp-less   编译less

- gulp-jade  编译jade

- gulp-connect  创建本地服务器（插件内置微型服务器）

- gulp-concat   合并文件（js、css）

- gulp-uglify   最小化js文件

- gulp-rename    重命名文件

- gulp-clean-css  压缩css

- gulp-minify-css   最小化css文件

- gulp-minify-html  压缩html文件

- gulp-imagemin   最小化图像

- gulp-livereload 实时刷新

- gulp-load-plun


## gulp模块自带的方法
1. **src()**  : gulp模块的src方法，用于产生数据流。它的参数表示所要处理的文件，这些指定的文件会转换成数据流。参数的写法一般有以下几种形式。
> js/app.js：指定确切的文件名。
> js/*.js：某个目录所有后缀名为js的文件。
> js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
> !js/app.js：除了js/app.js以外的所有文件。
> *.+(js 	css)：匹配项目根目录下，所有后缀名为js或css的文件。

src方法的参数还可以是一个数组，用来指定多个成员
`gulp.src(['js/**/*.js', '!js/**/*.min.js'])`
2. **dest()** ：dest方法将管道的输出写入文件，同时将这些输出继续输出，所以可以依次调用多次dest方法，将输出写入多个目录。如果有目录不存在，将会被新建。
```javascript
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```
dest方法还可以接受第二个参数，表示配置对象。
```javascript
gulp.dest('build', {
  cwd: './app',
  mode: '0644'
})
```
配置对象有两个字段。cwd字段指定写入路径的基准目录，默认是当前目录；mode字段指定写入文件的权限，默认是0777。

3. **task()** ：task方法用于定义具体的任务。它的第一个参数是任务名，第二个参数是任务函数。task方法还可以指定按顺序运行的一组任务。
```javascript
gulp.task('greet', function () {
   console.log('Hello world!');
});
gulp.task('build', ['css', 'js', 'imgs']);  
//此时如果任务中有return语句，则是异步执行数组中的任务，反之则是同步执行。
```
如果希望各个任务严格按次序运行，可以把前一个任务写成后一个任务的依赖模块。
```javascript
gulp.task('css', ['greet'], function () {
   // xxx
});
```

如果一个任务的名字为default，就表明它是“默认任务”，在命令行直接输入gulp命令，就会运行该任务。

```javascript
gulp.task('default', function () {
  // xxx
});
// 或者
gulp.task('default', ['styles', 'jshint', 'watch']);
```
4. **watch()** ：watch方法用于指定需要监视的文件。一旦这些文件发生变动，就运行指定任务。
```javascript
gulp.task('watch', function () {
   gulp.watch('templates/*.tmpl.html', ['build']);
});
```



## gulp插件模块介绍

1. **gulp-load-plugins** ：一般情况下，gulpfile.js中的模块需要一个个加载。
```javascript

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
```
上面代码中，除了gulp模块以外，还加载另外三个模块。
这种一一加载的写法，比较麻烦。使用gulp-load-plugins模块，可以加载package.json文件中所有的gulp模块。上面的代码用gulp-load-plugins模块改写，就是下面这样。
```javascript
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe($.jshint())
      .pipe($.uglify())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest('build'));
});
```
2. **gulp-livereload** ：gulp-livereload模块用于自动刷新浏览器，反映出源码的最新变化。它除了模块以外，还需要在浏览器中安装插件，用来配合源码变化。
```javascript
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');
gulp.task('less', function() {
   gulp.src('less/*.less')
      .pipe(watch())
      .pipe(less())
      .pipe(gulp.dest('css'))
      .pipe(livereload());
});
```



## 项目构建

1. `npm install gulp-concat gulp-uglify gulp-rename --save-dev`
2. gulp 加return是异步的，不加是同步的。
3. 依赖
  ```javascript
   gulp.task('css',['less'],function(){
    return XXX;
   });
  ```



