# typescript学习笔记

1. typeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用:
```typescript
  let num: number = 123;
  let str: string = 'hello world';
  
  // 声明数组的第一种方法
  let arr: number[] = [1, 2, 3];
  
  // 声明数组的第二种方法是使用数组泛型，Array<元素类型>
  let arr: Array<number> = [1, 2, 3];
  
  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  let x: [string, number];
  x = ['sss', 123]; // correct
  x = [123, 'sss']; // wrong
  
  // enum类型是对JavaScript标准数据类型的一个补充
  enum Color {red, blue, green}
  let c: Color = Color.green;
  
  // any
  let list: any[] = [1, true, "free"];
  
  // TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null
  let u: undefined = undefined;
  let n: null = null;
  
  // never类型表示的是那些永不存在的值的类型
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
      throw new Error(message);
  }

  // 推断的返回值类型为never
  function fail() {
      return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
      while (true) {
      }
  }
```
2. 只读属性，一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
```javascript
  interface: Point {
    readonly x: number;
    readonly y: string;
  }
  let p1: Point = { x: 10, y: 20 };
  p1.x = 5; // error!
  
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  ro[0] = 12; // error!
```
注意区分readonly和const的区别，readonly做为属性使用，const作为变量使用。
