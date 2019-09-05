# vue学习笔记

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
3. 过滤器filter:
```javascript
// <span>{{message | reverse}}</span>
//....
Vue.filter('reverse', function(value){
    return value.split('').reverse().join('');
})
new Vue({
    el: '#app',
    data: {
    	message: 'abcd'
    }
})
```
需要注意两点：(1) 需要给定过滤器一个唯一标识。 (2) 定义的函数最好可以返回有意义的值。
4. 插槽 slot
```javascrip
// <myslot>
   	<slot name='header'>header</slot>
	<slot name='body'>body</slot>
	<slot name='footer'>footer</slot>
// <myslot>
Vue.component('myslot', {
   template: `
   	<div>
	     <p slot='header'>header</p>
	     <p slot='body'>body</p>
	     <p slot='footer'>footer</p>
	 </div> `
})
new Vue({
el: '#app'
})
```
5. 局部注册：不需要每个组件都注册，可以让组件只能用在其他组件内
```javascript
// <mydiv></mydiv>

var child = Vue.extend({
   template: '<div> i am children</div>'
})
var parent = Vue.extend({
   template: '<div> i am parent <child></child></div>',
   component: {
        'child': child
      }
})

new Vue({
   el: '#app',
   components: {
         'mydiv': parent
    }
})
```

	
