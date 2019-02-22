# 深入浅出node.js

tags: 读书笔记

## 第七章 网络编程

 1. 构建UDP服务
  - UDP与TCP相比，最大的不同是UDP不是面向连接的。UDP中，一个套接字可以与多个UDP服务通信，虽然提供面向事务的简单不可靠信息传输服务，但在网络差的情况下存在丢包严重的问题。
  - 创建一个UDP套接字
    ```javascript
    var dgram = require('dgram');
    var socket = dgram.createSocket('udp4');    
    ```
 2. 构建HTTP服务
  - http的特点，它是基于请求响应式的，以一问一答的方式实现服务，虽然基于TCP回话，但是本身却无回话特点。
  - http服务只做两件事：**处理http请求**和**发送http请求**。
  - http请求报文和响应报文的报文内容都包含两部分：**报文头**和**报文体**。
  - HTTP代理：http模块包含一个默认的客户端代理对象http.globalAgent。它对每个服务器端创建的连接进行了管理，默认情况下，通过ClientResquest对象对一个服务器发起的HTTP请求最多可以创建6个连接。它的实质是连接池。
  - 我们可以自行修改代理对象，代码如下
     ```javascript
        var agent = new http.Agent({ maxSockets:10});
        var options = {
            hostname:'127.0.0.1',
            port: 1234,
            path:'/',
            method:'GET',
            agent:agent
        }
     ```

 - 也可以设置agent的选项为false值，以脱离连接池的管理，使得请求不受并发的限制。



## 第八章 构建Web应用

 - 获取查询字符串后的信息
    + ```javascript 
         var url = require('url');
         var querystring = require('querystring');
         var query = querystring.parse(url.parse(req.url).query);  
         ```

    + 更简洁的方法是给url.parse()方法传入第二个参数
      ```javascript
        var url = require('url');
        var query = url.parse(req.url,true).query;
      ```
    + 需要注意的是如果查询字符串中的键出现多次，那么它的值会是一个数组。
 - 获取cookie

   + req.headers.cookie（字符串格式）。
     * 可做如下处理
        ```javascript
           var array =  req.headers.cookie.split(';');
           var cookie = {};
           for(var i = 0; i < array.length; i++ ){
             var pair = array[i].split('=');
             cookie[pair[0].trim()] = pair[1].trim();
           }
        ```

     * 设置cookie的方法
        ```javascript
           res.writeHead(200,{'Set-Cookie':'isVisit=1'});
           res.setHeader('Set-Cookie',['name=111',{ others } ])；
           //多个时
           res.setHeader('Set-Cookie',['name=111','password=111']);
        ```

- QPS
   + QPS: 每秒查询率，经常用来衡量域名服务器的机器的性能
   + `QPS = 并法量 / 平均响应时间`

- MIME

   + MIME: 多用途互联网邮件扩展类型（Multipurpose Internet Mail Extensions）
   + Content-Type中的值出了包含mime，还可以包含其他的一些值。
     ```javascript
        Content-Type: text/javascript; chatset=utf-8     
     ```
- 服务端拿到表单提交的数据
   ```javascript
      var url = require('url');
      url.parse(linkUrl,true).query; //是一个对象
   ```
- 地址重定向
   ```javascript
      res.writeHead(302,{'Location':'http://www.baidu.com'})
   ```

## 第九章 玩转进程

- WebWorker允许创建工作线程并在后台运行，使得一些阻塞较为严重的计算不影响主线程上的UI渲染。
  + ```javascript
       var worker = new Worker('xxx.js');
       worker.onmessage = function(event){
           document.getElemenetById('result').textContent = event.data;
       }
       ```
  + 主线程与工作线程之间通过`onmessage()`和`postMessage()`进行通信，子进程对象由send()方法实现主进程向子进程发送数据，message事件实现收听子进程发来的数据。
  + 同源限制：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
  + DOM限制：Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 `DOM 对象`，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。
  + 通信联系：Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
  + 脚本限制：Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 `XMLHttpRequest` 对象发出 AJAX 请求。
  + 文件设置：Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://）
  + 错误处理：主线程可以监听Worker是否发生错误。如果发生错误，Worker会触发主线程的`error`事件
    * ```javascript	
         worker.onerror(function (event) {
         	console.log(['ERROR: Line ', e.lineno, ' in ', e.filename,': ', 					e.message].join(''));
         });
          worker.addEventListener('error', function (event) {
             // ...
         });
         ```
  + 关闭Worker: 使用完毕，为了节省系统资源，必须关闭Worker
     * ```javascript
           //主线程
           worker.terminate();
           //Worker线程
           self.close();
       ```


