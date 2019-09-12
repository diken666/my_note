// cesium的通视分析

import React from 'react';
import './App.css';
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewer: {}
    };
    this.click = this.click.bind(this);
    this.drawLine = this.drawLine.bind(this);
  }
  componentDidMount(){
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, // 是否创建动画小器件
      timeline: false,   // 是否显示时间控件
      fullscreenButton: false, // 是否显示全屏按钮
      geocoder: false, // 是否显示地名查找控件
      baseLayerPicker: true,  // 是否显示图层选择控件
      vrButton: false
    });
    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: 'http://popcity.popsmart.cn:9001/data/ningbo/yuyao/demo/lvchengnew/tileset.json',
      maximumScreenSpaceError: 2,       // 最大的屏幕空间误差
      maximumNumberOfLoadedTiles: 1000,  // 最大加载瓦片个数
    }));


    tileset.readyPromise.then(res=>{
      viewer.camera.flyToBoundingSphere(res.boundingSphere);
    });
    viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(this.click, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.setState({
      viewer
    });

  }


  click(e) {
    let viewer = this.state.viewer;
    let worldSpace = this.state.viewer.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid);

    // 世界坐标转换为投影坐标
    let webMercatorProjection = new Cesium.WebMercatorProjection(viewer.scene.globe.ellipsoid);
    let viewPointWebMercator = webMercatorProjection.project(Cesium.Cartographic.fromCartesian(worldSpace));

    // console.log(viewPointWebMercator);

    // 目标点集合
    let destPoints = [];
    // 观察点和目标点的距离
    var radius = 1000; // 视距1000米

// 计算45°和135°之间的目标点
    for (var i = 45; i <= 135; i++) {
      // 度数转弧度
      var radians = Cesium.Math.toRadians(i);
      // 计算目标点
      var toPoint = new Cesium.Cartesian3(viewPointWebMercator.x + radius * Math.cos(radians), viewPointWebMercator.y + radius * Math.sin(radians), 30);
      // 投影坐标转世界坐标
      toPoint = webMercatorProjection.unproject(toPoint);
      destPoints.push(Cesium.Cartographic.toCartesian(toPoint.clone()));
    }

    console.log(destPoints);
    this.pickFromRay(viewer, destPoints, worldSpace);
  }

  // 画线
  drawLine(viewer, leftPoint, secPoint, color) {
    viewer.entities.add({
      polyline: {
        positions: [leftPoint, secPoint],
        arcType: Cesium.ArcType.NONE,
        width: 5,
        material: color,
        depthFailMaterial: color
      }
    })
  }
  pickFromRay(viewer, destPoints, viewPoint) {
    for (var i = 0; i < destPoints.length; i++) {
      // 计算射线的方向，目标点left 视域点right
      var direction = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(destPoints[i], viewPoint, new Cesium.Cartesian3()), new Cesium.Cartesian3());
      // 建立射线
      var ray = new Cesium.Ray(viewPoint, direction);
      var result = viewer.scene.pickFromRay(ray); // 计算交互点，返回第一个
      this.showIntersection(viewer, result, destPoints[i], viewPoint);
    }
  }

  // 处理交互点
  showIntersection(viewer, result, destPoint, viewPoint) {
    // 如果是场景模型的交互点，排除交互点是地球表面
    if (Cesium.defined(result) && Cesium.defined(result.object)) {
      this.drawLine(viewer, result.position, viewPoint, Cesium.Color.GREEN); // 可视区域
      this.drawLine(viewer, result.position, destPoint, Cesium.Color.RED); // 不可视区域
    } else {
      this.drawLine(viewer, viewPoint, destPoint, Cesium.Color.GREEN);
    }
  }

  render(){
    return (
        <div id='cesiumContainer'>

        </div>
    );
  }

}

export default App;


