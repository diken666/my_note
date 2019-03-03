# JS,ES复习

1. 原型和原型链
    // 博客链接：https://www.cnblogs.com/libin-1/p/5820550.html
    函数（Function）才有prototype属性，对象（除Object）拥有___proto___， proto不是一个规范属性，只是部分浏览器实现了此属性。
2. instanceof究竟是运算什么？
```javascript
//假设instanceof运算符左边是L，右边是R
L instanceof R 
//instanceof运算时，通过判断L的原型链上是否存在R.prototype
L.__proto__.__proto__ ..... === R.prototype ？
//如果存在返回true 否则返回false
```
所以一句话理解instanceof的运算规则为：
instanceof检测左侧的__proto__原型链上，是否存在右侧的prototype原型。

3. let声明的变量，不存在变量提升
```javascript
// var
console.log(foo) //undifined
var foo = 2;
//let
console.log(foo) //报错
let foo = 2;
```
  暂时性死区(TDZ)：只要块级作用域内存在le命令，它所声明的变量就“绑定”这个区域，不在收到外部影响。
 ```javascript
 var temp = '123';
 if(true){
     temp = 'abc';   //报错
     let temp; 
 }
 ```
 4. const实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。

 
