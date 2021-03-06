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
  
  6. 组件间的通信方式
  + 父->子：通过props
  + 子->父：利用回调函数 和 自定义事件机制
  + 跨级（上到下）: 利用context实现（见下一）
  + 无嵌套关系的组件通信（见下二）
   ```jsx
    import React from 'react'; 
    import ReactDOM from 'react-dom'; 
    import PropTypes from 'prop-types';
    
    class List extends React.Component{
    static childContextTypes = {
        propA: PropTypes.string
    };
    constructor(){
        super();
        this.state = {
            name: 'lalala'
        }
    }
    getChildContext(){
        return {
            propA: 'propA'
        }
    }
    changeHandler(e){
        console.log(e.target.value)
    }
    render(){
        return <div>
            <ListItem name={this.state.name} onChange={(e)=>this.changeHandler(e)}></ListItem>
        </div>
     }
    }
    
    class ListItem extends React.Component{
    static contextTypes = {
    	propA: PropTypes.string
    };

    render(){
	return <div>
	    <input type="text" onChange={this.props.onChange}/>
	    <p>收到父组件Context信息为：{this.context.propA}</p>
	    <p>收到父组件props信息为：{this.props.name}</p>
	</div>
     }
     }

    ReactDOM.render(<div>
	<List></List>
	</div>, document.querySelector('#app')
    )
   ```
   
   ```jsx
   // 不嵌套组件间的通信主要是靠 node.js Events模块来实现的
   // npm i events -D 安装模块
   // 新建 event.js文件， 里面内容为   import {EventEmitter} from 'events';  export default new EventEmitter();
   
   import React from 'react';
   import ReactDOM from 'react-dom';
   import emitter from './event';
   
   class List1 extends React.Component{
    constructor(){
        super();
        this.state = {
            message: '---'
        }
    }
    componentDidMount(){
        this.eventEmitter = emitter.addListener('postMessage', (message)=>{
            this.setState({
                message
            })
        })
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter)
    }

    render(){
        return <div>
            <p>收到List2的消息为：{this.state.message}</p>
        </div>
     }
    }

    class List2 extends React.Component{
       clickHandler(message){
          emitter.emit('postMessage', message)
       }
       render(){
            return <div>
                <button onClick={()=>this.clickHandler('lalala')}>点我向List1传递消息</button>
            </div>
       }
     }
     
     ReactDOM.reader(){
     	return <div>
	    <List1/>
	    <List2/>
	</div>
     }
   ```
