
# Sass语法学习

1. 嵌套
  ```scss
  #main p {
    color: #00ff00;

    .redbox {
      background-color: #ff0000;
    }
  }
  // 编译后
  #main p {
    color: #00ff00;
  }
  #main p .redbox {
    background-color: #ff0000;
  }
  ```

2. 父选择器 &
  ```scss
  a {
    font-weight: bold;

    &:hover { text-decoration: underline; }
  }
  // 编译后
  a {
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
  ```
&必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器,如
  ```scss
  #main {
    color: black;
    &-sidebar { border: 1px solid; }
  }
  // 编译为
  #main {
    color: black; 
  }
  #main-sidebar {
    border: 1px solid; 
  }
  ```
3. 嵌套属性：有些 CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如
  ```scss
  .funky {
    font: {
      family: fantasy;
      size: 30em;
      weight: bold;
    }
  }
  // 编译后
  .funky {
    font-family: fantasy;
    font-size: 30em;
    font-weight: bold; 
   }
  ```
  命名空间也可以包含自己的属性值
   ```scss
   .funky {
      font: 20px/24px {
        family: fantasy;
        weight: bold;
      }
    }
    // 编译后
    .funky {
      font: 20px/24px;
      font-family: fantasy;
      font-weight: bold;
    }    
   ```
4. 注释 /* */ 与 //：/**/ 多行注释, // 单行注释， 前者会在编译后仍存在，后者会消失
5. 变量$：变量以美元符号开头，赋值方法与 CSS 属性的写法一样，变量支持块级作用域，局部中如果想定义全局，需要使用!global声明
  ```scss
    $width: 5em;
    
    #main {
      width: $width;
    }
  ```
6. 数据类型：支持6种数据类型
    - 数字，1, 2, 13, 10px
    - 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
    - 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
    - 布尔型，true, false
    - 空值，null
    - 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
    - maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
7. 圆括号可以用来改变运算的顺序
  ```scss
    p {
      width: 1em + (2em * 3);
    }
    // 编译后
    p {
      width: 7em; 
    }
  ```
8.插值语句 #{}
  ```scss
  $name: foo;
  $attr: border;
  p.#{$name} {
    #{$attr}-color: blue;
  }
  // 编译为
  p.foo {
    border-color: blue;
  }
  ```
9. 变量定义 !default：可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。
10. @-Rules 与指令
   - @import：通常，@import 寻找 Sass 文件并将其导入，但在以下情况下，@import 仅作为普通的 CSS 语句，不会导入任何 Sass 文件
      + 文件拓展名是 .css
      + 文件名以 http:// 开头
      + 文件名是 url()
      + @import 包含 media queries
   - Sass 允许同时导入多个文件 `@import "rounded-corners", "text-shadow";`
   - 如果需要导入 SCSS 或者 Sass 文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。例如，将文件命名为 _colors.scss，便不会编译 _colours.css 文件。
   - 大多数情况下，一般在文件的最外层（不在嵌套规则内）使用 @import，其实，也可以将 @import 嵌套进 CSS 样式或者 @media 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中。
   - Sass 中 @media 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 @media 嵌套在 CSS 规则内，编译时，@media 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 @media 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。
   ```scss
   .sidebar {
      width: 300px;
      @media screen and (orientation: landscape) {
        width: 500px;
      }
    }
    // 编译为
    .sidebar {
      width: 300px; 
    }
    @media screen and (orientation: landscape) {
      .sidebar {
        width: 500px; 
      }
    }
   ```
 11. 控制指令
  - @if：当@if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码
   ```scss
   p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @if 5 < 3 { border: 2px dotted; }
    @if null  { border: 3px double; }
  }
  // 编译后
  p {
    border: 1px solid; 
  }
  
  
  $type: monster;
  p {
    @if $type == ocean {
      color: blue;
    } @else if $type == matador {
      color: red;
    } @else if $type == monster {
      color: green;
    } @else {
      color: black;
    }
  }
   // 编译后
   p {
    color: green; 
   }
   ```
  - @for：@for 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：@for $var from <start> through <end>，或者 @for $var from <start> to <end>，区别在于 through 与 to 的含义：当使用 through 时，条件范围包含 <start> 与 <end> 的值，而使用 to 时条件范围只包含 <start> 的值不包含 <end> 的值。另外，$var 可以是任何变量，比如 $i；<start> 和 <end> 必须是整数值。
  ```scss
  @for $i from 1 through 3 {
    .item-#{$i} { width: 2em * $i; }
  }
  // 编译后
  .item-1 {
    width: 2em; 
  }
  .item-2 {
    width: 4em; 
  }
  .item-3 {
    width: 6em; 
  }
  ```
 - @each：@each 指令的格式是 $var in <list>, $var 可以是任何变量名，比如 $length 或者 $name，而 <list> 是一连串的值，也就是值列表。
  ```scss
  @each $animal in puma, sea-slug, egret, salamander {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
    }
  }
  // 编译后
  .puma-icon {
    background-image: url('/images/puma.png'); 
  }
  .sea-slug-icon {
    background-image: url('/images/sea-slug.png'); 
  }
  .egret-icon {
    background-image: url('/images/egret.png'); 
  }
  .salamander-icon {
    background-image: url('/images/salamander.png'); 
  }
  ```
 - @while：@while 指令重复输出格式直到表达式返回结果为 false。这样可以实现比 @for 更复杂的循环，只是很少会用到。例如：
  ```scss
  $i: 6;
  @while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
  }
  // 编译后
  .item-6 {
    width: 12em; 
  }
  .item-4 {
    width: 8em; 
  }
  .item-2 {
    width: 4em; 
  }
  ```
12 参数：参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号
  ```scss
  @mixin sexy-border($color, $width) {
    border: {
      color: $color;
      width: $width;
      style: dashed;
    }
  }
  p { @include sexy-border(blue, 1in); }
  // 编译后
  p {
    border-color: blue;
    border-width: 1in;
    border-style: dashed; 
  }
  ```
  混合指令也可以使用给变量赋值的方法给参数设定默认值，然后，当这个指令被引用的时候，如果没有给参数赋值，则自动使用默认值：
  ```scss
  @mixin sexy-border($color, $width: 1in) {
    border: {
      color: $color;
      width: $width;
      style: dashed;
    }
  }
  p { @include sexy-border(blue); }
  h1 { @include sexy-border(blue, 2in); 
  // 编译后
  p {
    border-color: blue;
    border-width: 1in;
    border-style: dashed; 
  }
  h1 {
    border-color: blue;
    border-width: 2in;
    border-style: dashed; 
  }
  ```
13. 函数指令：Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用
  ```scss
  $grid-width: 40px;
  $gutter-width: 10px;

  @function grid-width($n) {
    @return $n * $grid-width + ($n - 1) * $gutter-width;
  }

  #sidebar { width: grid-width(5); }
  // 编译后
  #sidebar {
    width: 240px; 
  }
  ```
