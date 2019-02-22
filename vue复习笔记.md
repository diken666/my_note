# vue复习笔记

1. 自定义指令： Vue.directive
```vue
Vue.directive('指令名字',{
	// 调用一次，第一次绑到元素上使用
    bind: function(el, value){
        //el必不可少， value是一个对象，value.value获取传入的值
    },
    undate: function(){},
    unbind: function(){}
})
```
2. 自定义元素指令： Vue.elementDirective（测试时出现错误，建议不用）
```vue
Vue.elementDirective('指令名称', {
    bind: function(){
        console.log(this.el.className);
        console.log(this.el.getAttribute('name'))
    },
    update: function(){},
    unbind: function(){}
})
```
3. 