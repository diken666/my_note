1. 函数柯里化：慢慢凑齐参数，延迟函数的执行（先分期交钱，再交货）
```js
// ⚠️ 函数的length属性，表示该函数有多少个必须要传入的参数，及第一个默认参数前的所有参数

// 概念版
const curry = (fn, arr = []) => {
  return (...args) => {
    // 判断总参数是否与fn参数个数相等
    if ([...arr, ...args].length === fn.length) {
      return fn(...arr, ...args) // 扩展参数，调用fn
    } else {
      return curry(fn,[...arr, ...args]) //迭代，传入现有的所有参数
    }
  }
}
 
 // 最终版
const curry = ( fn, arr = []) => {
  return (...args) => {
    return ( a => a.length === fn.length ? fn(...a) : curry(fn, a))([...arr, ...args])
  }
}
let curryPlus = curry((a,b,c,d)=>a+b+c+d)
curryPlus(1,2,3)(4) //返回10
curryPlus(1,2)(4)(3) //返回10
curryPlus(1,2)(3,4) //返回10

```

2. call、apply、bind三兄弟
> 1. 接收的第一个参数都是要绑定的this的指向
> 2. apply的第二个参数是一个参数数组，call和bind后的参数作为实参按顺序传入
> 3. bind不会立即调用，其它两个会

⚠️  call和apply，在严格模式下，函数this的值就是call和apply的的第一个参数的值，非严格模式下，第一个参数的值指定为null或者undefined时，this会自动替换指向全局对象，原始值会自动包装

```js
const developer = {
  getSkills: function(...args) {
    console.log(...args)
  }
}
const webDeveloper = {
  skills: ['html']
}
	
developer.getSkills.call(webDeveloper, 'h5', 'css3', 'js')
developer.getSkills.apply(webDeveloper, ['h5', 'css3', 'js'])
developer.getSkills.bind(webDeveloper)( 'h5', 'css3', 'js')
// 或者
developer.getSkills.bind(webDeveloper, 'h5', 'css3', 'js')()
```

3. 在局部作用域下，`undefined`是可以修改值的，所以局部作用域下，判断一个变量是否为`undefined`，更严谨的方法是 `typeof a === 'undefined'` 或者 `a === void(0)` 

🚩 为啥使用 `void` ?  void通常用于获取undefined的原始值，一般使用 `void(0)`或者`void 0`，因为`void`是不能被重写的 🌟  
🚩 全局作用域下，undefined不能被修改实际上是，`window.undefined`不能被修改，因为浏览器下任何全局变量都是在window下的，`let undefined = 3`会提示已经被定义
```js
function test() {
  let undefined = 3
  console.log(undefined)
}
test() // 3
```

4. `['1', '2', '3'].map(parseInt)` 返回什么 ？why ？[MDN中map定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) [MDN中parseInt定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
```js
['1', '2', '3'].map(parseInt) // [1,NaN,NaN]
// 首先了解map中函数中参数，
// arr.map(function callback(currentValue, index, array)
// currentValue: 正在处理的当前函数
// index: 当前元素的索引
// array: 调用map方法的数组

// 再来看parseInt的参数
// parseInt(string, radix)
// string: 要被解析的值，如果不是字符串 会被转化为字符串
// radix: 一个介于2到36的的整数，在radix为undefined或0或未指定情况下，加遵守如下规则：
// 1. 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制)
// 2. 如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值
// 3. 如果字符串 string 以其它任何值开头，则基数是10 (十进制)

// 所以 上述函数 相当于执行 如下
['1', '2', '3'].map((item, index) => {
  return parseInt(item, index)
})
// 依次返回 parseInt('1', 0)，parseInt('2', 1)，parseInt('3', 2)
// 所以返回[1, NaN, NaN]
```


5. 什么是防抖和节流？有何区别？如何实现？
> 1. 防抖：n秒内函数只会执行一次，如果n秒内再次触发，则重新计算时间
> > 思路：每次事件触发事件就取消之前的延时调用
> ```js
> function debounce(fn, delay) {
>   let timeout = null;
>   return function() {
>     clearTimeout(timeout);
>     timeout = setTimeout(() => {
>       fn.apply(this, arguments)
>     }, delay) 
>   }
> }
> ```
> 2. 节流：n秒内只会触发一次，节流会稀释函数的执行频率
> > 思路：每次触发事件时，都判断当前是否有等待执行的延迟函数
> ```js
> function throttle(fn, delay) {
>   let canRun = true;
>   return function () {
>     if (!canRun) return;
>     canRun = false;
>     setTimeout(() => {
>       fn.apply(this, arguments)
>       canRun = true
>     }, dealy)
>   }
> }
> ```

6. Set, Map, WeakSet和WeakMap的区别，[ECMAScript 6 入门中的描述](https://es6.ruanyifeng.com/#docs/set-map)
> 1. Set：成员不能重复，只有键值，没有键名，类似数组（length变为size），可枚举，有`add`  `delete` `has` `clear`等方法，`Array.from`方法可以将Set结构转化为数组
> 2. WeakSet：将弱引用对象储存在一个集合中，`只能存放对象引用，不能存放值`，有`add` `has` `delete`方法
> 3. Map：构建时应传入可枚举对象，类似对象，键名不再局限于自字符串，有`set` `get` `delete` `has` `clear` 等方法，有size属性，遍历map用[key, value] of map, 或者 forEach((value, key) => {})
> 4. WeakMap：和Map类似，但是其中的`键是弱引用`对象，值可以是任意的，因为可能被垃圾回收，所以`WeakMap的key是不可枚举的`，有`has` `get` `set` `delete`等方法

7. JS运行机制：
> - 执行流程图如下
> > ![Event Loop事件循环](./images/EventLoop事件循环.png)
> > 1. 整体的script(作为第一个宏任务)开始执行的时候，会把所有代码分为两部分：“同步任务”、“异步任务”
> > 2. 同步任务会直接进入主线程依次执行
> > 3. 异步任务会再分为宏任务和微任务
> > 4. 宏任务进入到Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中
> > 5. 微任务也会进入到另一个Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中
> > 6. 当主线程内的任务执行完毕，主线程为空时，会检查微任务的Event Queue，如果有任务，就全部执行，如果没有就执行下一个宏任务
> > 7. 上述过程会不断重复，这就是Event Loop事件循环
> - 关于`同步任务`和`异步任务`
> > 1. 同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
> > 2. 异步任务：不进入主线程，而进入“任务队列”，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会到主线程中执行。  
> > ⚠️  `new Promise`会进入主线程立即执行，`Promise.then()`则属于`微任务`  
> > ⚠️  同样注意`async/await`，async函数返回的是一个Promise，所以在`await`行及以上内容会立即执行，await后的内容则相当于`promise.then`里的内容，属于微任务
> - 关于`Microtask`和`Macrotask/task`
> > 1. Microtask 微任务
> > - process.nexrtTick
> > - promise.then
> > - Object.observe(废弃)
> > - MutationObserver
> > 2. Macrotask 宏任务
> > - setTimeout / setInterval
> > - setImmediate
> > - I/O
> > - UI渲染

8. 有`var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];`数组，要求数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
> ```js
> // 首先要用到Array.flat()函数
> // flat()方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
> 
> // 1. 先扁平化处理
> let tempArr = arr.flat(Infinity)
> // 2. 去重
> let tempSet = new Set(tempArr)
> // 3. 转为数组 再排序
> Array.from(tempSet).sort((a,b) => a - b)
> // 简化合并后
> Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b)
> ```

9. `Object.create` 创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`，[MDN上说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)， 关于`__proto__`属性，是用来读取或设置当前对象的prototype对象，目前只有浏览器环境下必须要部署这个属性。
> 参数：
> > - `proto` 必选， 新创建的原型对象
> > - `propertiesObject` 可选，需要传入一个对象，对象属性类型参照[Object.defineProperties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)，如果该参数不为`undefined`，该传入对象的自有可枚举属性（及其自身的定义属性，而不是其原型链上的枚举属性）将为新创建的对象添加指定的属性值和对应的属性描述符
> ```js
> let testObj = Object.create({}, {a: { value: 123 }, b: { value: "123" }})
> // 注意区分 new Object() 和 Object.create()的区别
> let a = { test: 123 }
> let b = new Object(a)
> let c = Object.create(a)
> b.hasOwnProperty("test")  // true
> b.__proto__ === Object.prototype // true
> c.hasOwnProperty("test")  // false
> c.__proto__  // { test: 123 }
> 
> // 延伸，如何显示一个new功能
> function (fn, ...arg) {
>   const obj = Object.create(fn.prototype)
>   const ret = fn.apply(obj, arg);
>   // ⚠️ 因为Object.create(null)创建的对象是不继承Object原型链上的属性的
>   // ⚠️ 通过 {} 和 new Object()创建的对象是一样是要继承的
>   // instanceof 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
>   return ret instanceof Object ? ret : obj
> }
> 
> ```

10. 三种判断数组的方法和优劣：`Object.prototype.toString.call()`、`instanceof `、`Array.isArray()`
> 1. `Object.prototype.toString.call()`，适用范围最广
> ```js
> let a = []
> Object.prototype.toString.call(a) // [object Array]
> 
> Object.prototype.toString.call(1) // "[object Number]"
> Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
> Object.prototype.toString.call(null) // "[object Null]"
> Object.prototype.toString.call(undefined) // "[object Undefined]"
> ```
> 2. `instanceof`，它会在该对象的原型链上找对应的`Array`的原型
> ```js
> [] instanceof Array // true
> [] instanceof Object // true
> ```
> 3. `Array.isArray()`，性能最好，但要考虑兼容性

11. `const`和`let`声明的变量不在`window`上，用`var`和`function`声明的变量和方法会出现在`window`上

12. 将数组`['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']`和数组`['A', 'B', 'C', 'D']`合并为`["A1", "A2", "A", "B1", "B2", "B", "C1", "C2", "C", "D1", "D2", "D"]`
```js
  // 方法1 （思路：将b数组加入大的标志值，合并排序后再清除标志值）
  let a = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
  let b = ['A', 'B', 'C', 'D'].map(item => item + '3');
  let res = [...a, ...b].sort().map(item => {
    if (item.includes('3')) return item.replace('3', '')
    return item
  })
  // 方法2 (思路：遍历a数组，当遇到要插入位置时，及尾号为2时，插入b数组元素，最后数组压平处理)
  let a = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
  let b = ['A', 'B', 'C', 'D'];
  let copyB = b;
  let res = a.map(item => {
    if (item.charAt(1) === '2') {
      return [item, copyB.shift()]
    }
    return item;
  }).flat();
  
````

13. vue中`defineProperty`和`Proxy`和区别：
> 一句话：Proxy能够劫持整个对象，而defineProperty只能劫持设置的对象属性，多了一层遍历
> ```js
> // defineProperty
> let obj = {};
> Object.defineProperty(obj, "name", {
> 	enumerable: true,
> 	set(value) {
> 		console.log("设置值了");
> 		_name = value
> 	},
> 	get() {
> 		console.log("取值了");
> 		return _name
> 	}
> })
> obj.age = 12; // 将不会提示
> 
> // Proxy
> let objProxy = new Proxy(obj, {
> 	get(obj, prop) {
> 		console.log("取值了");
> 		return obj[prop]
> 	},
> 	set(obj, prop, value) {
> 		console.log("设置值了");
> 		obj[prop] = value;
> 	}
> })
> objProxy.test = 123; // 会提示设置值了，obj中会出现test属性
> 
> ```

14. 下面函数的输出是？一句话`具名自执行函数，函数名可读且不能修改(const理解)`
```js
var b = 10;
(function b() {
  b = 20;
  console.log(b)
})();

// 输出如下：
// ƒ b() {
//  b = 20;
//  console.log(b)
// }

// 原因
// 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
// IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
```

15. 使用迭代方式实现`flat`函数
```js
// 1. 迭代方式
const arr = [1, 2, [3, 4]]
function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr)
	}
	return arr
}
// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

// 2. 递归方式
function flatten(arr) {
	let resArr = [];
	arr.forEach(item => {
		if (Array.isArray(item)) {
			resArr.push(...flatten(item));
		} else {
			resArr.push(item);
		}
	})
	return resArr
}
// 3. 字符串转换
arr.join(",").split(",").map(item => Number(item))
```

16. 下列代码什么情况下会打印1 ?
```js
var a;
if (a == 1 && a == 2 && a ==3) {
	console.log(1);
}

// 1. ==符号会进行隐式转换，所以可以改写toString 或者 valueOf方法
var a = {
	i: 0,
	// 转化为数字类型时 优先调用 valueOf
	valueOf() {
		return a.i++;
	},
	toString() {
		return a.i++;
	}
}

// 2. 如果a是数组，用数组的shift方法覆盖toString方法
var a = [1, 2, 3];
a.toString = a.shift

// 3. 可以用Symbal.toPrimitive
var a = {
	[Symbal.toPrimitive]: ((i) => () => i++)(0)
}
```

> 知识点：
> > 1. `toString`和`valueOf`的区别：
> > > toString：将对象的原始值以字符串形式返回
> > > valueOf： 返回最适合该对象的原始值
> > > 在数值运算中会优先调用`valueOf`，如 a + b
> > > 在字符串运算中会优先调用`toString`, 如 alert(a)
> >
> > 2. `Symbal.toPrimitive` 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。[参看MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)

17. `push`在伪数组中的一些使用，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- 首先明确，push方式是一个通用的方法，可以在数组和伪数组中使用
- 判断一个变量是否是伪数组，需要如下条件
> 1. 不为空且是对象
> 2. 对象上的`splice`属性是函数类型
> 3. 对象上的`length`属性是正整数
> > 补充： `splice`可向数组中添加或删除项，返回值是裁剪下来的数组(若无裁剪 则返回空数组)，[w3school介绍](https://www.w3school.com.cn/jsref/jsref_splice.asp)，参数如下：
> > - index: 必须，添加或删除的位置，负数时是从结尾取
> > - howmany：必须，要删除的项目数量，如果为0，则不删除项
> > - item1... itemX：可选，向数组添加新项目
```js
// 思考如下输出
var obj = {
	'2': 3,
	'3': 4,
	'length': 2,
	'splice': Array.prototype.splice,
	'push': Array.prototype.push
}
obj.push(1) // { '2': 1, '3': 4, .... }
obj.push(2) // { '2': 1, '3': 4, .... }
```

18. `call`和`apply`有什么区别，哪一个性能更好？
- call和apply的作用是一样的，区别在于传入的参数不同
- 第一个参数都是指定指向内部的this
- apply第二个参数是指定数组或者类数组，call从第二个开始传入的参数是不固定的
- call的性能不apply好，call少了第二个参数的解构过程
- `call(this, ...params)`、`apply(this, [item1, item2, ...])`

19. 实现`(5).add(3).minus(2)`的功能
```js
Number.prototype.add = function(num) {
	// this或者this.valueOf()都可以
	return this.valueOf() + num
}
Number.prototype.minus = function(num) {
	return this.valueOf() - num
}
(5).add(3).minus(2) // 6
```

20. 以下代码会输出什么，为什么？
```js
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x) // undefined
console.log(b.x) // { n: 2 }
```
- 运算符`.`的优先级是高于`=`的，所以先执行`a.x`，此时`a.x = undefined`
- 而后`a`被指向新对象`{ n: 2}`，然后老对象的x指向此时a的新对象，所以此时老对象为`{ n: 1, x: { n: 2 } }`，新对象为`{ n: 2 }`
- 因为b一直指向老对象，所以会有如上输出

21. 某公司12月数据如下，`{ 1: 123, 5: 222, 11: 333 }`，希望转化为长度为12的数组形式`[123, null, ...]`，可如下操作
```js
let obj = { 1: 123, 5: 222, 11: 333 }
let res = Array.from({length: 12}, (it, index) => obj[index + 1] || null)
```
- 这里主要是考`Array.from`的使用，[MDN文档](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/global_objects/array/from)，参数如下：
> `arrayLike`：必选，伪数组或可迭代对象
> `mapFn`：可选，每个元素会执行的回调函数
> `thisArg`：可选，执行回调时`mapFn`的`this`对象

22. 字符串大小写取反
```js
// 方法1
function processStr(str) {
	let arr = str.split('');
	let newArr = arr.map(item => {
		return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase()
	})
	return newArr.join("")
}
// 方法2
function processStr(str) {
	return str.replace(/[a-zA-Z]/g,function(a){
		return /[a-z]/.test(a) ? a.toUpperCase() : a.toLowerCase();
  })
}
```
23. 字符串匹配问题，从长度为n的字符串S中，查找是否存在字符串T，T的长度是m，若存在则返回存在位置
```js
const S = '123#adc#12322'
const T = 'adc'

// 方法1 search方法
const find = (S, T) => {
	return S.search(T)
}
// 方法2 match方法
const find = (S, T) => {
	const matchCtn = S.match(T)
	return matchCtn ? matchCtn.index : -1
}
// 方法3 substr (form, length)
const find = (S, T) => {
	if (S.length < T.length) return -1
	for (let i = 0; i < S.length - T.length; i++) {
		if (S.substr(i, T.length) === T) return i
	}
	return -1
}
```

24. `for`和`forEach`的性能比较，结果：`量级较小时，forEach更快`
```js
let arrs = new Array(100000);
console.time('for');
for (let i = 0; i < arrs.length; i++) {};
console.timeEnd('for');

console.time('forEach');
arrs.forEach((arr) => {});
console.timeEnd('forEach');

// node环境下，chrome下差不多
// 10w长度时 for: 2.269ms forEach: 0.323ms
// 100w长度时 for: 3.306ms forEach: 3.088ms
```
25. 关于`IFC(内联格式化上下文)`的知识点，不受竖直方向的padding/margin的影响，⚠️ IFC中不可能有块级元素，当插入块级元素时 会产生两个匿名块将块级元素分开

26. [Reflect](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/global_objects/reflect)，是一个内置对象，提供拦截js操作的方法
```js
let obj = {
  a: 1,
  b: 2
}
Reflect.get(obj, "b") // 2
Reflect.set(obj, "c", 123) // true  obj={ a: 1, b:2, c: 123 }
```

27. 输出1-10000之间所有的对称数，例如121、1331等
```js
// 思路 数字 ->字符串数组 -> 反转 -> 与原数字比较
[...Array(1000).keys()].filter(x => {
  return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join(''))
})
```

28. 移动`0`，给定一个nums数组，将所有0移动到数组末尾，同时保持非零元素的相对顺序，要求：`原数组上操作，不能拷贝额外数组`、`尽量减少操作次数`
```js
let nums = [0, 1, 0, 2, 0, 3, 0, 0, 4]
for (let i = nums.length; i >= 0; i--) {
  if (nums[i] === 0) {
    nums.splice(i, 1)
    nums.push(0)
  }
}
```

29. 实现一个add函数，满足如下功能
```js
add(1) // 1
add(1)(2) // 3
add(1, 2)(3) // 6

// 实现
function add() {
  let args = [...arguments]
  let addFun = function() {
    return add.apply(null, [...args, ...arguments])
  }
  addFun.toString = function () {
    return args.reduce((a, b) => a + b)
  }
  return addFun
}
```

30. 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数
> 例如给定 `nums = [2, 7, 11, 15]`，`target = 9`，返回`[0,1]`
```js
function answer(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if (arr[j] === target - arr[i]) {
        return [i, j]
      }
    }
  }
  return "not found"
}
```

31. 写一个函数，输入整数类型，返回整数逆序后的字符串。要求使用递归，不能使用全局变量，输入函数必须只有一个函数传入，必须返回字符串
```js
function fun(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num
  } else {
    return "" + num2 + fun(Math.floor(num1))
  }
}
```

32. 写出如下代码打印结果
```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
// 以上只是Foo的构造方法，没有产生实例，此刻也没有执行
Foo.prototype.a = function() {
  console.log(3)
}
// 现在原型上挂载了a方法，方法输出3
Foo.a = function() {
  console.log(4)
}
// 现在Foo上挂载了直接方法a
Foo.a();
// 立即执行Foo上的a方法
let obj = new Foo();
// 这里调用了Foo的构造方法，Foo的构造方法主要做了两件事
// 1. 将全局Foo的a方法直接替换为输出1的方法
// 2. 新对象上挂载直接方法a，输出值为2
obj.a();
// 因为有直接方法，不需要去访问原型链，所以使用this.a
Foo.a();
// 构造方法里已经替换了全局Foo上的a方法
```

33. 修改一下print函数，使之输出0到99，或者99到0
> 要求：
> 1. 只能修改`setTimeout`到`Math.floor(Math.random() * 1000)`的代码
> 2. 不能修改`Math.floor(Math.random() * 1000)`
> 3. 不能使用全局变量
```js
function print(n){
  setTimeout(() => {
    console.log(n);
  }, Math.floor(Math.random() * 1000));
}
for(var i = 0; i < 100; i++){
  print(i);
}

// 方法1， 立即执行函数
function print(n) {
  setTimeout((() => {
    console.log(n)
  }).call(n, []), Math.floor(Math.random() * 1000))
}
// 方法2，取巧，让随机数无效
function print(n){
  setTimeout(() => {
    console.log(n);
  }, 1,  Math.floor(Math.random() * 1000));
}
```

34. `URLSearchParams`对url上的查询字符串进行处理，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)
```js
let searchObj = new URLSearchParams("https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33")
searchObj.get("elective") // "800,700"
```

35. var变量申明提升问题
```js
// 如下输出什么
var name = "tom"
(function () {
  if (typeof name === "undefined") {
    var name = "jack"
    console.log(name)
  } else {
    console.log(name)
  }
})();
// 输出 jack
// 如果想要输出tom，需
(function (name) {
  if (typeof name === "undefined") {
    var name = "jack"
    console.log(name)
  } else {
    console.log(name)
  }
})(name);
```

36. 计算区间交集
```js
/**
 区间用长度为2的数组表示，如[2, 5]
 区间不算方向，如[5, 2]等同于[2, 5]
 可以接受多个区间，并返回所有区间的交集，如空集用null表示
 getIntersection([5, 2], [4, 9], [3, 6]) // [4, 5]
 getIntersection([4, 9], [1, 2]) // null
**/
function getIntersection() {
  let args = [...arguments]
  if (args.length === 0) {
    return null
  }
  let max, min
  args.forEach((item, index) => {
    let sortArr = item.sort()
    if (index === 0) {
      max = sortArr[1]
      min = sortArr[0]
    } else {
      max = sortArr[1] < max ? sortArr[1] : max
      min = sortArr[0] > min ? sortArr[0] : min
    }
  })
  if (min > max) return null
  return [min, max]
}
```

37. 统计当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数
```html
<html>
  <head></head>
  <body>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
    </div>
  </body>
</html>
// 会输出：
{
  totalElementsCount: 7,
  maxDOMTreeDepth: 4,
  maxChildrenCount: 3
}
```
```js
function finalAnswer() {
  let totalDoms = document.getElementByTagName("*")
  let maxDOMTreeDepth = -1
  let maxChildrenCount = -1
  Array.from(totalDoms).forEach(item => {
    let nowTreeDepth = getTreeDepth(item)
    let nowChildCount = item.children.length
    if (nowTreeDepth > maxDOMTreeDepth) maxDOMTreeDepth = nowTreeDepth
    if (nowChildCount > maxChildrenCount) maxChildrenCount = nowChildCount
  })
  return {
  	totalElementsCount: totalDoms.length,
  	maxDOMTreeDepth,
  	maxChildrenCount
  }
}
// 获取某个标签下最大的标签嵌套层数
function getTreeDepth(el) {
  if(el.children.length === 0) {
    return 0
  } else {
    let max = -1
    for (let i = 0; i < el.children.length; i++) {
      let h = getTreeDepth(el.children[i])
      if (h > max) max = h
    }
    return max + 1
  }
}
```

38. 浏览器监听复制事件
```html
<p id="txt">123123</p>
```
```js
document.getElementById("txt").addEventListener("copy", () => {
  console.log("copy")
})
```

39. 获取两个日期中的有效日期，如`2020-1-1`到`2020-1-3`，得到之前的日期（包括起始位置）
```js
function getRangeDate(start, end) {
  let startDate = new Date(start).getTime()
  let endDate = new Date(end).getTime()
  let oneDayMs = 24 * 60 * 60 * 1000
  let res = []
  if (startDate > endDate) return res
  while(startDate <= endDate) {
    let date = new Date(startDate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    res.push(`${year}-${month}-${day}`)
    startDate += oneDayMs
  }
  return res
}
```

40. 关于箭头函数
> 1. 箭头函数不能作为构造函数
> 2. 没有自己的this值，this值从外部继承
> 3. 箭头函数没有arguments
```js
var Array = (a) => {
  this.name = a
}
var arr = new Array(123) // 报错， Array不是构造函数

var Test = () => {
  console.log(arguments) 
}
Test() // 会报arguments未定义的错误

```

41. 关于Promise的链式调用使用实例，“有两个按钮，按照点击顺序返回异步请求”
```html
<button onClick=btnClick("a")>a</button>
<button onClick=btnClick("b")>b</button>
<p id="txt"></p>
<script>
let txt = document.getElementById("txt")
let str = ""
let pro = new Promise(resolve => resolve())
function btnClick(type) {
  pro = pro.then(() => {
    let time = type === "a" ? 1000 : 2000
    return new Promise(resolve => {
      setTimeout(() => {
        str += type
        txt.innerText = str
        resolve()
      }, time)
    })
  })
}
</script>
```

42. js中的栈内存和堆内存，[参考链接](https://juejin.cn/post/6844903873992196110)
+ 像`Number` `String` `Boolean` `null` `undefined` `Symbol` 等简单数据类型都是存储在栈内存上的，遵循先进后出的方式
+ 引用数据类型都是存储在堆内存上的，闭包里的变量也是存在堆内存上的(需声明后调用才行，否则不会形成)
```js
// ⚠️ 注意，用new创建出来的变量也是存储在堆内存上的，如
let a = new String('123')
let b = new String('123')
let c = '123'
console.log(a == b, a === b, a == c, a === c) // false, false, true, false
```

43. 图片懒加载实现
- 使用`getBoundingClientRect`的方式
```js
function lazyload() {
  let viewHeight = document.documentElement.clientHeight //获取可视区高度
  let imgs = document.querySelectorAll('img[data-src]')
  imgs.forEach((item, index) => {
    if (item.dataset.src === '') return

    // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    let rect = item.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      item.src = item.dataset.src
      item.removeAttribute('data-src')
    }
  })
}
// 可以使用节流优化一下
window.addEventListener('scroll', lazyload)
```
- 使用`IntersectionObserver`，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
```js
const config = {
  // 目标所在的容器节点
  root: document.getElementById("xxx"),
  // 根元素的margin，影响交叉区域
  rootMargin: "0px",
  // 阀值，决定什么时候触发，数字或数组
  threshold: 0
}
let observer = new IntersectionObserver((entrys, self) => {
  entrys.forEach(item => {
  // 当监视元素出现在可视区域时
    if (item.isIntersecting) {
      // 处理代码
      // 解除监视
      self.unobserve(item)
    }
  })
}, config)
let scrollImgs = document.getElementByTagName("img")
// 遍历，监视图片元素
Array.from(scrollImgs).forEach(item => {
  // 开始监视
  observer.observe(item)
})
```

44. 使用`MutationObserver`监听DOM的改变，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
```html
<div id="con"></div>
<script>
  let conDom = document.getElementById("con")
  // 需要观察的变动
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  }
  function callBack() {
    console.log("change !")
  }
  let observer = new MutationObserver(callback)
  // 开始监听
  observer.observe(conDom, config)
  // 停止监听
  observer.disconnect()
</script>
```

