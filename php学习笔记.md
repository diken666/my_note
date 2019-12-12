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
   // stripos： 计算字符串某部分首次出现的位置（大小写不敏感）
   // strpos： 。。。 （大小写敏感）
   $str = 'hello world'
   $findS = 'world'
   stripos($str, $findS);
   strpos($str, $findS);
   
   // strripos： 计算字符串在目标字符串中最后一次出现的位置（大小写不敏感）
   // strrpos： 。。。（大小写敏感）
   strripos($str, $findS);
   strrpos($str, $findS);
   
   // str_ireplace: 替换字符串（大小写不敏感）
   // str_replace: 
   $str = 'hello world' 
   $replace = 'hi'
   $search = 'hello'
   str_replace($search, $replace, $str)
   
   //substr：截取字符串
   substr('abcdef', 1);  // bcdef
   substr('abcdef', -2); // ef
   
   // trim：除去特殊字符
   // 默认除去的特殊字符有： " "普通空格符、 "\t"制表符、 "\n"换行符、 "\r"回车符、 "\0"空字节符、 "\x0B"垂直制表符
   $str = "\n\n123"
   trim($str);  //123
   trim($str, '1'); //23
   
   //addslashes：转义字符串
   //stripslashes：还原字符串
   $str = " I'm tom "
   addslashes($str);
   stripslashes($str)
   
   // str_repeat： 重复字符串
   str_repeat("123", 10);
   
   // str_shuffle： 打乱字符串
   str_shuffle('123')
   
   // explode： 字符串分割
   explode("hello world" , " ")
   
 ```
