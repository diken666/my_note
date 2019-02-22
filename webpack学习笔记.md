# webpack学习笔记

AMD CMD

##  允许直接运行webpack   
1. webpack 在4.0之后可以支持0配置打包，所谓的0配置，就是在webpack打包的时候（`npx webpack`），默认会将src下的index.js文件打包到dist文件夹下的main.js文件。



## 项目搭建

#### 基础项目雏形

1. 初始化项目`npm init -y`
2. 项目中引入`webpack`和`webpack-cli`模块。
> npm install webpack webpack-cli -D

3. 项目中创建src源码目录，并向其中加入文件，创建`webpack.config.js`配置文档，并设置好基础配置。
```javascript
const path = require('path');
module.exports = {
    entry: './src/index.js',    //入口
    output: {       //出口
        filename: "build.js",
        path: path.resolve('./build')
    },
    devServer: {},    //服务器配置
    module: {},       //模块配置
    plugins: [],            //插件配置
    mode: 'development',   //开发环境
    resolve: {},    //配置解析
};
```
此时在命令窗输入`npx webpack`会将`src/index.js`打包到`build`目录下的`build.js`文件。



#### 加入服务器配置
1. 项目引入`webpack-dev-server`后，在`webpack.config.js`配置文件中加入如下代码，设置好路径和端口，
```javascript
devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 1234,
        compress: true , //服务器端压缩
        open: true  //是否打开浏览器窗口
    }
```
此时在cmd窗口下输入`npx webpack-dev-server`就可以启动服务器，访问build目录下的文件。
2. 上一步骤启动服务器太过麻烦，所以我们可以再配置一下信息，简化操作，找到`package.json`文件，并在scripts属性下加入如下代码，
```json
{
    "scripts": {
        "build": "webpack",  //用于项目构建（json文件不允许注释）
        "start": "webpack-dev-server"  //用于服务器启动
    }
}
```
配置好后，在命令行窗口下，输入`npm run build(or start)`即可运行相应服务。



#### 加入插件

##### 加入html-webpack-plugin插件

1. 项目引入`html-webpack-plugin`后，在`webpack.config.js`文件中加入如下代码配置：
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');   //注意没有s
module.exports = {
    //xxx
    entry: {
        page1: path.resolve(__dirname, './src/page1.js'),
        page2: path.resolve(__dirname, './src/page2.js'),
    }
    plugins: [
        new HtmlWebpackPlugin({
            filename: index.html,  //文件名字，默认是index.html
            template: "src/index.html",
            title: "test",    //标题名字
            chunks: ['page1','page2'], //用于多文件入口时
            minify: {
            	removeAttributeQuotes: true,  //去除属性引号
                collapseWhitespace: true      //折叠空格
            }
        })
    ]
}
```
index.html文件中如果想要使用配置文件中的title时，应该在文件中添加如下代码：
```html
<title><%= htmlWebpackPlugin.options.title %></title>
```

然后在命令窗中输入`npm run build`后，完成打包。
2. 打包时使用hash解决缓存问题，如下：
```javascript
new HtmlWebpackPlugin({
    hash: true
    //others
})
```



##### 加入clean-webpack-plugin插件

1. 该插件主要用来清除文件，项目引入该插件后，在`webpack.config.js`文件中添加如下代码：
```javascript
module.exports = {
    //others
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            //others
        })
    ]
}
```



#### 处理多文件入口

1. 处理多入口文件最简单的做法是，如下：
```javascript
module.exports = {
    entry: ['src/a.js', 'src/b.js'],
    //others
}
```
以上处理方法的弊端，它会将所有文件合并成一个文件，这可能不会是我们想要的结果。
2. 我们还可以用对象的方式，如下：
```javascript
module.exports = {
    entry: {
        a: 'src/a.js',
        b: 'src/b.js'
    }
}
```
如果只做如上处理，会报错，因为我们输入的是多个文件对象，输出却是一个文档（具体几个output中代码书写而定）, 为此，我们在输出文件配置中应该如下配置，
```javascript
module.exports = {
    entry: {
        a: 'src/a.js',
        b: 'src/b.js'
    },
    output: {
        filename: '[name].[hash:8].js',      //hash看情况加
        path: path.join(__dirname, 'build')
    }
}
```
按照上述代码执行后，可能会面临新的问题，那就是HTML文档会把入口的所有文件都引入HTML文档中，这可能并不是我们想要的结果，因此我们在上一步骤的基础上，还应该继续添加如下配置：
```javascript
module.exports = {
    // others
    plugin: {
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            hash: true,
            chunks: ['test1','test2']  //名字与entry中属性名相同，且只能是js文件
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',
            hash: true,
            chunks: ['test3','test4']
        })
    }
}
```



#### 热更新

1. 虽然当我们运行`npm start`指令开启服务器后，更改代码，浏览器会立即刷新显示新的内容，但是这种刷新是一种“硬刷新”，它是一种整个页面的刷新，当页面内容很庞大的时候，这对小的修改来说太浪费时间和资源，因此需要能够局部刷新的“热更新”。
2. 要达到热更新的目的，我们需要进行如下配置：
- webpack.config.js文件的配置

```javascript
     //others
     const webpack = require('webpack');
     module.exports = {
         //others
         devServer: {
             //other
             hot: true
         },
         plugins: [
             new webpack.HotModuleReplacementPlugin(),
             new HtmlWebpackPlugin({
                 //others
             })
         ]
     }

```
- 同时还应该在引入的js文档中监视模块的热更新，当文档内容变化时，好做出相对应的反应，代码如下：
```javascript
   if(module.hot){
       module.hot.accept();
   }
```

- 注意： 如果对HTML文档做出了修改，热更新并不能反应出来，这个时候还是要自己手动的刷新页面，才会出现更改后的效果。还有一点就是，以上热更新对应的所有的文档的都是对应的打包前的src目录下的文档，并不是打包后的文档修改，如果修改打包后的文档，页面并不会做出反应。



#### css
purifycss-webpack
postcss-loader
copy-webpack-plugin