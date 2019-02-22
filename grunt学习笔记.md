#  grunt学习笔记

## grunt中常用到的插件
- grunt-contrib-clean   清除文件（打包处理生成的）
- grunt-contrib-concat  合并多个文件的代码到一个文件
- grunt-contrib-uglify   压缩js文件
- grunt-contrib-jshint  javascript语法错误检查
- grunt-contrib-cssmin  压缩、合并css文件
- grunt-contrib-htmlmin  压缩html
- grunt-contrib-imagemin  压缩图片文件（无损）
- grunt-contrib-copy  复制文件、文件夹
- grunt-contrib-watch  实时监控文件变化、调用相应的任务重新执行
## 项目搭建
1. 创建新的一个文件夹命名为`grunt`，使用`npm init`命令生成`package.json`文件，并在json文件中添加入以下类似代码：
```json
"devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-clean": "^2.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-jshint": "^2.0.0",
    "grunt-contrib-requirejs": "^1.0.0",
    "grunt-contrib-uglify": "^4.0.0",
    "grunt-strip": "^0.2.1"
  }
```
2. 使用`npm install`命令下载`package.js`文件中的依赖。
3. 新建src目录用于放置源码，新建`Gruntfile.js`文件配置grunt信息。
4. 向Gruntfile.js文件中加入类似如下信息：
```javascript
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/zepto.js', 'src/underscore.js', 'src/backbone.js'],
                dest: 'dest/libs.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',           //源码目录
                dest: 'build/build.min.js' //输出目录
            }
        }，
        cssmin: {
  			options: {
    			mergeIntoShorthands: false,
    			roundingPrecision: -1
  			},
  			target: {
    			files: { 'output.css': ['foo.css', 'bar.css']}
  			}
		},
		watch: {
  			scripts: {
    			files: ['**/*.js'],
    			tasks: ['jshint'],
    			options: {
      				spawn: false,  //只监视修改的文件
                },
  			},
		},
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat','uglify']);
};
```