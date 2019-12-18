# 听晴空讲drupal8

1. 在`sites/default/setting.php` 可以取消注释如下代码，复制sites下的`example.setting.local.php`到`sites/default`目录并且重命名为`setting.local.php`，开启本地配置
```php
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}
```
2. 修改js和css的聚合功能，在`sites/default/setting.local.php`中将代码修改为如下：
```php
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```
3. drupal的结构：
  - html.html.twig
  - page.html.twig
  - region.html.twig
  - block.html.twig
  - node.html.twig
  - field.html.twig
