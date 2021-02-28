1. vue3 在创建虚拟DOM时 会根据内容会不会变化，添加静态标记，变化时，只比较静态标记，所以会更快
2. 引入环境变量 import.meta.env.xxx
3. template中使用store，$store.state.VoteDetail.voteDetail.voteId
4. vue3 为什么变快了
- diff算法优化
- hositStatic静态提升
- cacheHandlers事件侦听器缓存
- ssr渲染
5. ref只能监听简单的数据类型，reactive可以监听复杂数据类型(对象或者数组，否则无法响应式)
6. composition Api的本质，就是把ref注册导出的变量导入data，定义导出的方法导入到methods中
7. setup执行会在beforeCreatead和created之前，所以不能调用、data和methods中的方法，且直接将this直接定义为undefined
8. setup函数只能是同步的
9. ref的底层本质还是reactive，ref(11) -> reactive({ value: 11 })，template中不用.value来获取值，但是在赋值时需要使用.value
10. vue时是如何区别ref和reactive的，是通过__v_isRef为true来判断的，也可调用方法isRef、isReactive
11. 对ref和reactive实行递归监听，当数据量较大时，会消耗较大内存，如果只想监听第一层及非递归监听，可以使用shallowRef、shallowReactive，不过shallowRef监听的是.vulue的变化，如过是.vulue.x值的变化则不起作用，这时可用triggerRef(state)主动触发更新，而reactive则没有该方法
12. toRow获取类型的原始数据，使用场景：在只是想获取原始数据，却又不想被追踪和更新页面
```js
let obj = { name: "test" }
let state = reactive(obj)
let obj2 = toRow(obj)
obj === obj2 // true
```
13. markRow阻止值被追踪
14. ref和toRef的区别
- ref -> 复制，修改数据不会影响原来的数据
- toRef -> 引用，修改数据会影响原来的数据
- ref数据发生改变，会更新UI
- toRef数据发生改变，不会触发更新
> toRef应用场景：想更新响应式数据，却又不想立即触发页面更新的时候
> toRef用法：toRef(对象，属性名)
> toRefs用法：toRefs(对象)

15. [customRef](https://www.vue3js.cn/docs/zh/api/refs-api.html#customref)，自定义`ref`
```js
function myRef(value) {
  return customRef((track, trigger) => {
    return {
      set: (newValue) => {
        console.log("set", newValue)
        trigger() // 是否触发页面更新
        value = newValue
      },
      get: () => {
        track() // 是否追踪
        console.log("get", value)
        return value
      }
    }
  })
}
```

16. 如何通过ref获取页面元素
```js
setup() {
  let myDom = ref(null) // 变量名需要和dom上的ref值相同
  return {
    myDom
  }
}
```

17. readonly创建只读数据，并且是递归只读（及每一层都是只读的），shallowReadonly（第一层只读）
```js
let state = readonly({ name: 123, info: { age: 1 } })
state.name = 222 // 无效
state.info.age = 22 // 无效
```

18. Proxy代理数组注意事项
```js
let obj = [1, 2, 3]
let state = new Proxy(obj, {
  get: (obj, key) => {
    return obj[key]
  },
  set: (obj, key, value) => {
    obj[key] = value
    // 当是数组时，set会执行两次，一次设置新值，一次修改长度，所以下面需要返回true
    return true
  }
})
```




