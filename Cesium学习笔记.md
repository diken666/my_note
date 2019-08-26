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
