# Cesium学习笔记


1. 常见设置项
```javascript
  animation: false, // 是否创建动画小器件 默认true
  timeline: true,   // 是否显示时间控件  默认true
  fullscreenButton: false, // 是否显示全屏按钮 默认true
  geocoder: false, // 是否显示地名查找控件 默认true
  baseLayerPicker: true,  // 是否显示图层选择控件 默认true
  vrButton: true    // 是否显示vr按钮 默认false
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
  // 显示帧率
  viewer.scene.debugShowFramesPerSecond = true
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
14. 添加倾斜模型
```javascript
      var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: 'http://popcity.popsmart.cn:9001/data/ningbo/yuyao/demo/lvchengnew/tileset.json',
          maximumScreenSpaceError: 2,       // 最大的屏幕空间误差
          maximumNumberOfLoadedTiles: 1000,  // 最大加载瓦片个数
          // modelMatrix: m
      }));
      // 这里直接获取tileset中的boundingSphere属性是会报错的
      // console.log(tileset.boundingSphere)
      tileset.readyPromise.then(res=>{
          viewer.camera.flyToBoundingSphere(res.boundingSphere)
      });
```
15. 添加动态纹理颜色
```javascript
  var redTube = viewer.entities.add({
      name : 'Red tube with rounded corners',
      polylineVolume : {
          positions : Cesium.Cartesian3.fromDegreesArray([-85.0, 32.0,-85.0, 36.0,-89.0, 36.0]),
          shape : this.computeCircle(6000.0),
          //颜色回调
          material : new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function() {
              return Cesium.Color.fromRandom({
                  minimumRed : 0.75,
                  minimumGreen : 0.75,
                  minimumBlue : 0.75,
                  alpha : 1.0
              });

          }, false))
      }
  });
  viewer.zoomTo(viewer.entities)
  
  computeCircle(radius) {
    var positions = [];
    for (var i = 0; i < 360; i+=100) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    return positions;
  }
```
16. 坐标转换
```javascript
function initPosition(){
	var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	handler.setInputAction(function (movement) {
		// 屏幕坐标（二维坐标）
		var twoSpace = movement.position;
		console.log("屏幕坐标（二维坐标）", twoSpace);
		
		// 二维坐标转世界坐标
		var worldSpace  = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
		console.log("二维坐标——》世界坐标", worldSpace);
		
		// 世界坐标转地理坐标（弧度）
		var geographySpace = viewer.scene.globe.ellipsoid.cartesianToCartographic(worldSpace);
		console.log("世界坐标——》地理坐标（弧度）", geographySpace);
		var geographySpace = Cesium.Cartographic.fromCartesian(worldSpace);
		console.log("世界坐标——》地理坐标（弧度）", geographySpace);
		
		// 世界坐标转屏幕坐标
		var twoSpace = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, worldSpace);
		console.log("世界坐标——》屏幕坐标", twoSpace);

		// 二维屏幕坐标系到三维坐标系的转换
		var threeSpace = viewer.scene.globe.pick(viewer.camera.getPickRay(twoSpace), viewer.scene);
		console.log("二维坐标——》三维坐标", threeSpace);

		// 三维坐标到地理坐标的转换
		var geographySpace = viewer.scene.globe.ellipsoid.cartesianToCartographic(threeSpace);
		console.log("三维坐标——》地标坐标（弧度）", geographySpace);
		var geographySpace = Cesium.Cartographic.fromCartesian(threeSpace)
		console.log("三维坐标——》地标坐标（弧度）", geographySpace);
		 
		// 地理坐标到经纬度坐标的转换
		var longitudeAndLatitude = [geographySpace.longitude / Math.PI * 180, geographySpace.latitude / Math.PI * 180, geographySpace.height];
		console.log("地标坐标（弧度）——》经纬度坐标", longitudeAndLatitude);
		var longitude = Cesium.Math.toDegrees(geographySpace.longitude);
		var latitude = Cesium.Math.toDegrees(geographySpace.latitude);
		var height = geographySpace.height;
		console.log("地标坐标（弧度）——》经纬度坐标：经度",longitude,"| 纬度",latitude,"| 高度",height);
		console.log("地标坐标（弧度）——》经纬度坐标：经度",longitude.toFixed(3),"| 纬度",latitude.toFixed(3),"| 高度",height.toFixed(1));
		
		// 经纬度坐标转地理坐标（弧度）
		var geographySpace = Cesium.Cartographic.fromDegrees(longitude, latitude, height);//单位：度，度，米
		console.log("经纬度坐标——》地理坐标（弧度）", geographySpace);
		 
		// 经纬度坐标转世界坐标（先转换成弧度再转换）
		var geographySpace = Cesium.Cartographic.fromDegrees(longitude, latitude, height);
		var worldSpace = viewer.scene.globe.ellipsoid.cartographicToCartesian(geographySpace);
		console.log("经纬度坐标——》世界坐标", worldSpace);
		
		// 经纬度转三维坐标
		var threeSpace = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
		console.log("经纬度坐标——》三维坐标", threeSpace);  
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
```
17. 获取两点间的距离
```javascript
    getDistance(positions){
        var distance = 0;
        // position中的数据项为世界坐标
        var point1cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
        var point2cartographic = Cesium.Cartographic.fromCartesian(positions[1]);
        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var s = geodesic.surfaceDistance;
        //返回两点之间的距离
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
        distance = distance + s;
        return distance
    }

```
18. 获取多线段的总距离和所围成多边形的面积
```javascript
	click(e){
          // 屏幕坐标（二维坐标）
          var twoSpace = e.position;
          // console.log("二维坐标-->", twoSpace);

          // 二维坐标转世界坐标
          var worldSpace = this.state.viewer.camera.pickEllipsoid(e.position, this.state.viewer.scene.globe.ellipsoid);
          // console.log("世界坐标-->", worldSpace);

          // 世界坐标转地理坐标（弧度）
          var geographySpace = this.state.viewer.scene.globe.ellipsoid.cartesianToCartographic(worldSpace);
          // console.log("地理坐标（弧度）-->", geographySpace);

          // 地理坐标转换为经纬度
          var lat=Cesium.Math.toDegrees(geographySpace.latitude);
          var lng=Cesium.Math.toDegrees(geographySpace.longitude);
          // console.log("经纬度-->", lat, lng);

          // 计算两点距离
          var tempPoint = this.state.point;
          tempPoint.push(worldSpace);

          var tempPositionArr = this.state.positionArr;
          tempPositionArr.push({lng, lat});
          this.setState({
              point: tempPoint,
              positionArr: tempPositionArr
          },()=>{
              // 画点
              this.state.viewer.entities.add({
                  position: Cesium.Cartesian3.fromDegrees(lng, lat),
                  ellipse : {
                      semiMinorAxis : 10.0,
                      semiMajorAxis : 10.0,
                      material : Cesium.Color.BLUE.withAlpha(1)
                  }
              });

              // 画线
              if(tempPositionArr.length > 1) {
                  // 如果位置数组不为空，开始画线
                  var lastPointLat = tempPositionArr[tempPositionArr.length-2].lat;
                  var lastPointLng = tempPositionArr[tempPositionArr.length-2].lng;

                  this.state.viewer.entities.add({
                      name: 'Red line on the surface',
                      polyline: {
                          positions: Cesium.Cartesian3.fromDegreesArray([lastPointLng, lastPointLat, lng, lat]),
                          width: 5,
                          material: Cesium.Color.RED
                      }
                  });

              }
              // 画面
              var tempArr = [];
              for(let i=0; i<this.state.positionArr.length; i++){
                  var positionArr = this.state.positionArr;
                  tempArr.push(positionArr[i].lng);
                  tempArr.push(positionArr[i].lat);
              }
              if(tempArr.length !== 0){
                  this.state.viewer.entities.add({
                      name : 'yellow polygon on surface',
                      polygon : {
                          hierarchy : Cesium.Cartesian3.fromDegreesArray([...tempArr]),
                          material : Cesium.Color.YELLOW
                      }
                  });
              }

              // 计算当前距离和面积
              if(this.state.point.length > 1){
                  if(this.state.point.length === 2){
                      this.setState({
                          distance: this.getDistance(this.state.point)
                      }, ()=>{
                          console.log("总距离为-->", this.state.distance);
                          console.log("总面积为-->", this.state.area);
                      });
                  }else{
                      this.setState({
                          distance: this.getDistance(this.state.point),
                          area: this.getArea(this.state.positionArr)
                      }, ()=>{
                          console.log("总距离为-->", this.state.distance);
                          console.log("总面积为-->", this.state.area);
                      })
                  }
              }

        });

    }

    // 获得总的线段距离
    getDistance(positions){
        var distance = 0;
        var geodesic = new Cesium.EllipsoidGeodesic();
        for(let i=0; i<positions.length-1; i++){
            var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
            var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i+1]);
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            distance = distance + s;
        }
        return distance
    }
    // 计算多边形面积
    getArea(points) {
        var res = 0;
        //拆分三角曲面
        if(points.length >=3){
            for(let i=2; i<this.state.point.length; i++){
                var angle = this.Angle(this.state.positionArr[0], this.state.positionArr[i-1], this.state.positionArr[i]);
                res += this.getTriangleArea(angle, [this.state.point[0], this.state.point[i-1], this.state.point[i]]);
            }
        }

        return res;
    }

    // 计算三角形的面积
    getTriangleArea(angle, pointArr){
        var dis_temp1 = this.getDistance([pointArr[0], pointArr[1]]);
        var dis_temp2 = this.getDistance([pointArr[1], pointArr[2]]);
        return dis_temp1 * dis_temp2 * Math.abs(Math.sin(angle * Math.PI / 180)) / 2;
    }

    // 获得线p2p1与p2p3的夹角（数值为角度值，如果要转化为弧度 还需要 * Math.PI / 180）
    Angle(p1, p2, p3) {
        var bearing21 = this.Bearing(p2, p1);
        var bearing23 = this.Bearing(p2, p3);
        var angle = bearing21 - bearing23;
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }

    Bearing(from, to) {
        var radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad)
        var degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度
        var lat1 = from.lat * radiansPerDegree;
        var lng1 = from.lng * radiansPerDegree;
        var lat2 = to.lat * radiansPerDegree;
        var lng2 = to.lng * radiansPerDegree;
        var angle = -Math.atan2(Math.sin(lng1 - lng2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2));
        if (angle < 0) {
            angle += Math.PI * 2.0;
        }
        angle = angle * degreesPerRadian;//角度
        console.log("bearing-->", angle)
        return angle;
    }
```
