# Drupal学习

### Drupal8 目录结构

- /core - Drupal 8 的内核文件，所有核心的文件、功能和模块都位于这个目录下
- /libraries - 第三方库，例如所见即所得编辑器，默认内核并未包含此目录，如有需要自行创建即可
- /modules - 贡献模块与自定义模块存放位置，类似于 D6, D7 的 sites/all/modules，建议在此目录下新建 contrib 和 custom 目录以分别组织贡献模块和第三方模块
- /profile - 安装配置文件
- /themes - 贡献主题或自定义主题
- /sites/[default|all|domain]/[modules|themes] - （在多站点情况下），只在指定站点使用的主题和模块可以放置在此目录结构下，以避免模块和主题出现在所有站点中
- /sites/[default|all|domain]/files - （在多站点情况下），此目录放置各种站点文件，如用户上传的文件、站点配置等

（了解）
- /core/asset - Drupal 8 所使用的各种扩展库，如 jQuery, CKEditor, Backbone, Underscore, Modernizer, Normalize CSS 等
- /core/include - Drupal 8 中还足以模块化的底层功能函数，如模块化系统本身
- /core/lib - Drupal 8 的各种核心类（classes）
- /core/misc - Drupal 8 核心所需要的前端杂项文件，如 js, css, 小图片等等
- /core/modules - Drupal 8 内核模块
- /core/profiles - Drupal 8 内置安装配置文件
- /core/scripts - 开发人员可用的各种命令行脚本
- /core/tests - Drupal 8 测试用相关文件
- /core/themes - Drupal 8 内核主题
- /core/vender - Drupal 8 核心所需要的后端库，如 Symfony2, Twig 等

说明：说明：尽管将模块和主题放置在 /modules 和 /themes 目录下比较方便，但 Drupal 8 目前依然支持 /sites/all/modules 和 /sites/all/themes 目录，
从站点备份的角度上来讲，将模块和主题放在 /sites 下似乎更为方便，因为这样只需要备份 /sites 目录即可
否则需要备份 /modules, /themes 和 /sites 三个目录
