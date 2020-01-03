# vagrant + drupal环境搭建

### 安装和配置vagrant
1. 下载好vagrant、vitual box
2. 新建 `vagrant/boxes/ubuntu_trusty64`， 并移动到对应文件夹
3. 下载box，在vagrant官网找到自己想要的box版本，获得对应链接的地址，并在其后面拼接`/providers/virtualbox.box`，例如此次下载的链接便是`https://app.vagrantup.com/ubuntu/boxes/trusty64/versions/20190514.0.0/providers/virtualbox.box`，并将下载好的box重新命名为`virtualbox.box`并放置在当前文件目录下
4. 添加box，`vagrant box add ubuntu_trusty64(自定义box名字) virtual.box(文件box名字)`
5. 运行 `vagrant init ubuntu_trusty64`， 过程会在文件夹中生成一个`Vagrantfile`文件
6. `vagrant up --provider=virtualbox` 注意，这里我的vagrant版本是2.2.6，virtualbox版本为6.1，并不能使用，需要virtualbox版本为（4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 6.0），查看ubuntu版本 `sudo lsb_release -a`
vagrant init ubuntu_trusty64
7. 配置vagrantfile文件

### 安装apache2
1. `sudo apt-get install apache2`
```
查看状态： service apache2 status/start/stop/restart
Web目录： /var/www
安装目录： /etc/apache2/
全局配置： /etc/apache2/apache2.conf
监听端口： /etc/apache2/ports.conf
虚拟主机： /etc/apache2/sites-enabled/000-default.conf
```
