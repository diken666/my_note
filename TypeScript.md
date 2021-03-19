1. 基础数据类型：`boolean`、`number`、`string`、`array`、`tuple`、`enum`、`any`、`void`、`null`、`undefined`、`never`、`object`

2. 接口，ts中接口的作用就是`为类型命名和为代码或第三方代码定义契约`
> 可选属性和只读属性
```typescript
interface Config {
  color?: string;
  readonly name: string;
}
// 只读数组
let arr: ReadonlyArray<number>
// readonly vs const
// 看是否是作为变量，如果作为变量，使用const，作为属性，使用readonly
```