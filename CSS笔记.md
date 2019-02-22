# CSS笔记

1. css流体布局下的宽度分离原则：就是css中的width属性不与影响宽度的padding/border（有时候包括margin）属性并存。
    应该 width独占用一层标签，而padding、border、margin利用流动性在内部自适应呈现。如：
    ```css
    .father{
    	width:100px;
    }
    .children{
    	margin: xxx;
    	Padding: xxx;
    	Border: xxx;
    }
    ```
2. box-sizing盒尺寸/盒尺寸的作用细节
   - box-sizing: content-box;  默认
   - box-sizing: padding-box;  Firefox曾今支持
   - box-sizing: border-box;  全线支持
   - box-sizing: margin-box;  从未支持过
3. 绝对定位的宽高百分比计算是相对于padding box的，会把padding的值计算在内，非绝对定位则是相对于content box计算的。 http://demo.cssworld.cn/3/2-11.php
4. max-width和max-height的默认值是none，min-width和min-height的默认值是auto（推测）
5. - <img src=”xxx” style = “width:480px !important”>
    img{max-width:110px;}  最后宽度为110px
   - 超越最大
        .container{ min-width: 1400px;   max-width: 1200px}    //width:1400px
6. 下拉过渡效果的css实现
  ```css
  .ele{ max-height: 0;  overflow: hidden;  transition: max-height .25s }
  .ele .active { max-height: 666px; }
  ```
  最大宽度合适就好，不宜多出太多，不然动画就回显得很僵硬。

