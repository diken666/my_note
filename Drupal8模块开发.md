# Drupal8模块开发

1. 可将自定义的模块放置在`/modules/custom/hello_world`或者`/sites/all/modules/hello_world`中
2. 在**.routing.yml中可以使用`_access:'TRUE'`替换`_permission`实现无限制访问
3. Drupal8读取配置的静态方法
```php
  $config = \Drupal::config('example.settings');
  print $config->get('message');
  // 如果编辑配置并使用新值更新他
  $config = \Drupal::service('config.factory')->getEditable('example');
  $config->set('message', 'hi')->save();
```
