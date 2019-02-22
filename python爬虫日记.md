# python爬虫日记

1. 获取操作系统的环境变量
```python
import os
name = os.environ.get('Path')
print(name)
```

2. 代理
```python
import urllib.request
#Ture为开启代理
proxyswitch = True
httpProxy_handler = urllib.request.ProxyHandler({"http": "112.91.218.21:9000"})
#私密代理
#httpProxy_handler = urllib.request.ProxyHandler({"http": "账号:密码@IP:端口号"})
nullProxy_handler = urllib.request.ProxyHandler({})
if proxyswitch:
    opener = urllib.request.build_opener(httpProxy_handler)
else:
    opener = urllib.request.build_opener(nullProxy_handler)
urllib.request.install_opener(opener)
request = urllib.request.Request("http://www.baidu.com")
response = urllib.request.urlopen(request)
print(response.read())
```
3. Python中的re模块有两种
```python
pattern = re.compile("\d")

#从起始位置开始往后查找，返回第一个符合的字符
pattern.match()  
#从任何位置开始往后查找，返回第一个符合的字符
pattern.search()
#所有全部匹配，返回列表
pattern.findall()
#分隔字符串，返回列表
pattern.split()
#替换
pattern.sub()
```
