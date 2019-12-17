# Drupal8主题开发笔记

安装的模块：[pathauto](https://www.drupal.org/project/pathauto) [devel](https://www.drupal.org/project/devel)

### 修改teaser：Structure -> Content types -> xxx Manage display -> Teaser

### 记录

1. 自定义主题的步骤：
  - 在网站根目录的`/themes`文件夹下创建一个文件夹，命名为mytheme。
  - 在`themes/mytheme`文件夹下创建css，images，js，templates文件夹，分别用于放置样式表，图片，js和模版文件。
  - 在mytheme文件夹下创建一个mytheme.info.yml文件，用来声明主题的必要信息。
  - 在mytheme文件夹下创建一个mytheme.libraries.yml文件，用来引入css和js文件。
  - 注意文件名前缀必须与主题目录名保持一致。
  - 保存所有文件，启用自定义主题
  
2. Drupal套用网站源码：
  - 解压后将所有文件及文件夹拷贝到自定义主题的文件夹下，相同的文件夹选择合并，相同的文件选择替换。
  - 拷贝index.html文件到templates文件夹下并改名为page--front.html.twig。
  - 对照index.html代码将css链接写入mytheme.libraries.yml中。
  - 对照index.html。。。 js 。。。  （照上）
  - 修改page--front.html.twig文件，删除<body></body>外的所有代码，包括标记本身，删除js链接，在img引用路径前加上`{{base_path}}themes/mytheme`
  - 清空缓存
  
3. Drupal有很多默认区域（Region），用户也可以自定义区域（在info.yml中），但是一旦自定义，所有默认区域将不可用，Drupal的默认区域有：
  - `sidebar_first`
  - `sidebar_second`
  - `content`
  - `header`
  - `parimary_menu`
  - `secondary_menu`
  - `footer`
  - `highlighted`
  - `help`
  - `breadcrumb`
  - 两个隐藏的 `page_top`  `page_bottom`

4. Breakpoints exercise
  - Extend -> Responsive Image -> checkout and install
  - Configuration -> Responsive Image style -> Add responsive image style -> Breakpoint group中选择自己的主题 -> Fallback image style选择 Thumbnail(100*100) -> save

5. Template Hierarchy(模版等级)  低到高
 - field.html.twig
 - node.html.twig
 - region.html.twig
 - page.html.twig
 - html.html.twig
 
6. 添加自定义region
 - 在.info.yml文件中声明region
 - 在page.html.twig中渲染
 - 添加css
 - 清除缓存
 - 检查 Structure -> Block layout
