# Cesium学习笔记


1. 常见设置项
```javascript
  animation: false, // 是否创建动画小器件
  timeline: true,   // 是否显示时间控件
  fullscreenButton: false, // 是否显示全屏按钮
  geocoder: false, // 是否显示地名查找控件
  baseLayerPicker: true,  // 是否显示图层选择控件
  vrButton: true    // 是否显示vr按钮
```
2. 常见动态控制
```javascript
  // 去除cesium logo水印
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 控制左下角animation控件是否显示 hidden/visible
  viewer.animation.container.style.visibility = 'hidden';
  // 控制时间线是否显示
  viewer.timeline.container.style.visibility = 'visible';
  // 添加单击和双击事件，this.click/this.doubleClick均为自定义函数，e获取点击位置
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.click, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.doubleClick, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  // 移除双击事件
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
```
3. 专业的控件展示
```javascript
  viewer.extend(Cesium.viewerCesiumInspectorMixin)
 ```

4. 点击home后默认视图展示位置和角度（东 南 西 北），默认展示美国区域
```javascript
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(-200, -200, 0, 0)
```
5. 添加水和灯光效果的额外数据
```javascript
  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask : true, // required for water effects
    requestVertexNormals : true // required for terrain lighting
  });
```
6. 确保地形后的物体被挡住
```javascript
  viewer.scene.globe.depthTestAgainstTerrain = true;
```
7. 几个基本的Cesium类型
 - Cartesian3 ：3D笛卡尔坐标 - 当用作位置时，它使用地球固定框架（ECEF）以米为单位相对于地球中心
 - Cartographic ：由WGS84椭球表面的经度，纬度（弧度）和高度定义的位置
 - HeadingPitchRoll：围绕东 - 北 - 上帧中的局部轴的旋转（以弧度表示）。标题是围绕负z轴的旋转。间距是围绕负y轴的旋转。Roll是围绕正x轴的旋转。
 - Quaternion ：表示为4D坐标的3D旋转。

8. 使用Cesium Camera的api来控制相机的位置和方向
 - Camera.setView(options) ：立即将相机设置在特定位置和方向
 - Camera.zoomIn(amount) ：沿着视图向量移动摄像机
 - Camera.zoomOut(amount) ：沿着视图向量向后移动相机
 - Camera.flyTo(options) ：创建从当前摄像机位置到新位置的动画摄像机飞行
 - Camera.lookAt(target, offset) ：定向和定位相机以查看具有给定偏移的目标点
 - Camera.move(direction, amount) ：向任何方向移动相机
 - Camera.rotate(axis, angle) ：围绕任何轴旋转相机
 ```javascript
 // Create an initial camera view
var initialPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
var homeCameraView = {
    destination : initialPosition,
    orientation : {
        heading : initialOrientation.heading,
        pitch : initialOrientation.pitch,
        roll : initialOrientation.roll
    }
};
// Set the initial view
viewer.scene.camera.setView(homeCameraView);
 ```
9. Cesium Entity是一个数据对象，可以与样式化的图形表示配对，并在空间和时间中定位，资料链接`https://cesium.com/docs/tutorials/creating-entities/`，以下是不同实体：
  - Polygon 多边形
  - polyline 多线段
  - Billboard 广告牌
  - Label 标签
  我们在实际生产中，可以为这些实体添加 高度、颜色、花纹等等
  ```javascript
    // Primitive API面向图形开发人员的低级别
    var viewer = new Cesium.Viewer('cesiumContainer');
    var wyoming = viewer.entities.add({
      polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([
                      -109.080842,45.002073,
                      -105.91517,45.002073,
                      -104.058488,44.996596,
                      -104.053011,43.002989,
                      -104.053011,41.003906,
                      -105.728954,40.998429,
                      -107.919731,41.003906,
                      -109.04798,40.998429,
                      -111.047063,40.998429,
                      -111.047063,42.000709,
                      -111.047063,44.476286,
                      -111.05254,45.002073]),
        height : 0,
        material : Cesium.Color.RED.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLACK
      }
    });

viewer.zoomTo(wyoming);
  ```
 ``` javascript
  // Entity API数据驱动可视化的高级别
  // 形状可以有很多种，具体参见上面的链接
  var entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse : {
    semiMinorAxis : 250000.0,
    semiMajorAxis : 400000.0,
    material : Cesium.Color.BLUE.withAlpha(0.5)
  }
});
viewer.zoomTo(viewer.entities);
var ellipse = entity.ellipse; // For upcoming examples

// 我们还可以更改图像的url和样式等
ellipse.material = '/docs/tutorials/creating-entities/images/cats.jpg';
 ```
10. 相机flyTo和zoomTo返回的都是一个promise
11. `EntityCollection`是一个用于管理和监视一组实体的关联数组。`viewer.entities`是一个`EntityCollection`。EntityCollection包括这样的方法，例如`add`， `remove`和`removeAll`用于管理的实体。
12. 添加点和标签和图片, 注意点和标签公用一个位置，所以两者间位置要有一些偏差。
```javascript
// 添加点和标签
var viewer = new Cesium.Viewer('cesiumContainer');
var citizensBankPark = viewer.entities.add({
    name : 'Citizens Bank Park',
    position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    point : {
        pixelSize : 5,
        color : Cesium.Color.RED,
        outlineColor : Cesium.Color.WHITE,
        outlineWidth : 2
    },
    label : {
        text : 'Citizens Bank Park',
        font : '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -9)
    }
});
viewer.zoomTo(viewer.entities);

// 添加图片
var citizensBankPark = viewer.entities.add({
  position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
  billboard : {
    image : '//cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Philadelphia_Phillies.png',
    width : 64,
    height : 64
  },
  label : {
    text : 'Citizens Bank Park',
    font : '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.TOP,
    pixelOffset : new Cesium.Cartesian2(0, 32)
  }
});
```
13. 为实体添加一些互动
```javascript
// 以下代码为从react项目中部分截取
viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
move(movement){
    var pickedPrimitive = this.state.viewer.scene.pick(movement.endPosition);
 
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
   
    if(Cesium.defined(this.state.prives) && this.state.isSet){
        var tempPrives = this.state.prives;
        tempPrives.billboard.scale = 1.0;
        tempPrives.billboard.color = Cesium.Color.WHITE;
        this.setState({
            prives : tempPrives
        })
    }
    if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
        pickedEntity.billboard.scale = 2.0;
        pickedEntity.billboard.color = Cesium.Color.ORANGERED;
        this.setState({
            prives: pickedEntity,
            isSet: true
        })
    }
    }
```
