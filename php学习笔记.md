# php学习笔记

### 语言基础

1. 数据类型： String， Integer， Float， Boolean， Array， Object， Null（七种）
2. 组合比较符：`x <=> y`, 如果x等于y（非恒等），返回0，大于返回1，小于返回-1
3. php中 ?? 与 js中||具有一样功能
4. php中的三目运算符 可以是 x>0 ? : "123" ，条件为真时返回true，为假时返回"123"
5. 定义常量可用 define(name, value) 或者 const， 注意 定义常量时不要以`__`开头，因为这样容易与php自带的魔术常量冲突
6. 常见的魔术常量：
  - `__LINE__` 文件中的当前行号
  - `__FILE__` 文件的完整路径和文件名
  - `__DIR__` 文件所在目录
  - `__FUNCTION__` 函数名称
  - `__CLASS__` 类的名称
  - `__TRAIT__` trait的名称
  - `__METHOD__` 类的方法名
  - `__NAMESPACE__` 当前命名空间的名称
  
### 流程和控制

1. foreach，遍历，仅用于数组和对象，注意区别于js中的Array.forEach((item, index)=>{}),
```php
  foreach( $array as $value ) {}
  
  foreach( $array as $key => $value ) {}
```
2. php一共有四个包含外部文件的方法：
  - include  
  - include_once
  - require
  - require_once
  带once和不带的区别： 带once的相同文件只能引入一次，再次引入时 文件不起作用
  include和require的区别： include当引入文件不存在时，程序程序会发出warning警告，但后续程序仍然会执行，require引入文件不存在时，程序会报错并且终止执行

### 函数

1. 函数参数传递的三种方式： `按值传递`, `通过引用传递`, `默认参数`
```php
  function test($a) {}
  function test(&$a) {}
  function test($a='123') {}
```
2. 使用`declare(strict_types=1)`设置严格模式
3. 可变参数数量：
```php
 function test(...$num) {}
 echo test(1, 2, 3, 4)
```

### 字符

1. 单引号：使用时，字符串中需要转义的特殊字符只有反斜杠和单引号本身。
2. 双引号：双引号中的字符串可以解析其中的变量。
3. 大小写转化函数：
  - ucfirst： 字符串首字母转化为大写
  - lcfirst： 字符串首字母转化为小写
  - ucwords： 字符串每个单词首字母转化为大写
  - strtoupper： 字符串转化为大写
  - strtolower： 字符串转化为小写
```php
  $str = 'aaa'
  strtoupper($str)
```
4. 查找字符串：
 ```php
   // stripos： 查找字符串某部分首次出现的位置
 ```
