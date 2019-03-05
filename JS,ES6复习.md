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
 ```javascript
 const Arr = [];
 Arr.push('aaa'); //可以执行
 ```
 5. 顶层对象在浏览器环境下指的是window，在node环境下是global，在ES5中顶层对象的属性和全局变量时等价的。
 ```javascript
 // window
 var a = '123';
 console.log(a === window.a); //true
 //global
 var a = '123';
 console.log(a === global.a); //true
 ```
 从ES6开始，全局变量将逐渐与顶层对象的属性隔离。
 ```javascript
 //window
 let a = '123'
 console.log(a === window.a); // false
 ```
 6. 解构赋值时：ES6内部使用===判断一个位置是否有值，如果一个成员不严格等于undefined，默认值是不会生效的。
 ```javascript
 let [x = 1] = [undefined];
 x // 1
 let [x = 1] = [null]
 x // null
 ```
 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
 ```javascript
 let {toString: s} = 123;
 console.log(s === Number.prototype.toString); //true
 let {toString: b} = false;
 console.log(b === Boolean.prototype.toString); //true
``` 
7. Symbol: 用来表示独一无二的值，symbol函数前不能使用new命令，否则会报错，因为生成的symbol是一个原始类型的值，不是对象，它是一种类似于字符串的数据类型。symbol值可以转化为字符串和布尔值，但是不能转化为数值，且不能与其他类型的值进行运算，否则会报错。
```javascript
var s = Symbol('s');
String(s); // 'Symbol(s)'
Boolean(s); // true
```
symbol值做为对象属性时，不能使用点运算符，且应该放在[]中。
```javascript
var s = Symbol();
var obj = {
    [s]: '111'   // 如果不用[]，则代表键名是字符串s
}
```
8. Set：类似于数组，但是成员的值都是唯一的，没有重复。
```javascript
var a = new Set([1, 1, 2, 3]);
a // set [1, 2, 3]
```
weakSet：与set结构类似，但是有两点不同，1：weakSet的成员只能是对象，而不能是其他类型的值 2：weakSet中的对象都是弱引用，及垃圾回收机制不考虑对该对象的引用。
9. Map：类似于对象，也是键值对的集合，但是键的范围不限于字符串，map结构的供了‘值-值’的对应。
   weakMap：与Map的区别，1：weakMap只接受对象作为健名（null除外）2：weakMap的键名所指向的对象不计入垃圾回收机制。
10. Proxy：代理，用于修改某些操作的默认行为。
```javascript
var obj = new Proxy({}, {
  get: function(target, key, receiver){
    console.log('get: '+key);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, receiver){
    console.log('set: '+key);
    return Reflect.get(target, key, receiver)
  }
})
obj.a = 1; // set: 1
b = obj.a; // get: a
```
11. generator: 是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。
```javascript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
var fo = foo(2);
fo.next(); // Object { value: 3, done: false }
fo.next(); // Object { value: 4, done: false }
fo.next(); // Object { value: 5, done: false }
```
12. class：ES6中的class可以看做是一个语法糖，它的绝大部分功能，ES5也能做到。
    (1) 类的数据类型是函数，类本身就指向它的构造函数：
    ```javascript
    class Point {}
    typeof Point // function
    Point === Point.prototype.constructor  //true
    ```
    (2) 类和模块的内部默认使用严格模式，所以不需要使用use strict指定运行模式。
    (3) 与ES5一样，类的所有实例共享一个原型对象：
    ```javascript
    var p1 = new Point(2, 3);
    var p2 = new Point(3, 2);
    p1.__proto__ === p2.__proto__  //true
    ```
    (4) 类不存在变量提升，这一点与ES5完全不同：
    ```javascript
    new Foo();    //ReferenceError
    class Foo{}
    ```
    (5) 类中的静态方法：前面加上static关键字，该方法不会被实例继承，而是直接通过类调用。
    ```javascript
    class Foo {
        static sayHello(){
            console.log('hello');
        }
    }
    Foo.sayHello() //'hello'
    var foo = new Foo();
    foo.sayHello(); //foo.sayHello is not a function
    ```
    (6) 目前，ES6中只有静态方法没有静态属性，要想达到同种效果需
    ```javascript
    class Foo{}
    Foo.prop = 1;
    ```
    
    

