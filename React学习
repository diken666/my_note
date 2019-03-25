# React学习

1. 在浏览器环境下直接运行react
```javascript
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<script type='text/babel'>
    ReactDOM.render(<p>aaa</p>, document.getElementById('app'));
</script>
```
2. 新建react项目
 +  新建文件夹`npm init -y`
 
 
3. 创建组件的方式（组件标签首字母必须大写）
	+ function
	```jsx
	function Hello(props){
		// 如果返回null 组建什么都不渲染
	    return <div>{props.name}, {props.age}</div>
	}

	const stu = {
	    name: 'tom',
	    age: '12'
	},

	ReactDOM.render(
	<Hello {...stu}>{/*展开运算符*/}</Hello>, 	document.body.querySelector('#app')
	)
	// 如果是jsx文件中，还需要向外面导出 exports default ***;
	```
	+ class: 如果要使用class定义组件,需要继承自React.Component
		```jsx
			class Movie extends React.Component{
				// render渲染dom, 必须要有返回值
				// 在class关键字创建的组件中，如果想使用外界传递过来的props，直接通过this.props.***来访问。
				// this相当于组件的实例化对象
				constructor(){
	                super();
	                this.state = {}
				}
	   			render(){
	                return <div>movie</div>
	   			}
			}

		```
	+ 两种创建方式的区别：
		- 使用class关键字创建的组件，有自己的私有数据 和 生命周期函数
		- 使用function创建的组件，只有props，没有自己的私有数据 和 生命周期函数

4. 在jsX中想要写行内样式，不能为style写字符串的值，应该：
```jsx
	const mydiv = <div style={{color:'red', fontSize:'35px'}}></div>
```
也可以直接导入css文件，不过要先安装loader，`cnpm i style-loader css-loader -D`, 然后webpack配置文件中应该设置`{test: /\.css$/, use: ['style-loader', 'css-loader']}`


5. 获取dom对象()
  ```jsx
  class Test extends React.Component{
       componentDidMount(){
       	// 可以通过this.refs.btn获取button的dom对象
           console.log(this.refs)
       }
       render(){
           return <button ref='btn'>button</btn>
       }
  }
  ```
