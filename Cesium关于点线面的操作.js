import Cesium from 'Cesium';

let obj = {
    // 画点
    addPoint(viewer, nowPosition){
       return  viewer.entities.add({
           position : nowPosition,
           point : {
               pixelSize : 8,
               color : Cesium.Color.DODGERBLUE,
               outlineColor : Cesium.Color.WHITE,
               outlineWidth : 2
           }
        });
    },
    // 画线
    // 参数 { 世界坐标}
    addLine(viewer,  positionArr){
        if(positionArr.length>1){
            let length = this.getDistance(positionArr.slice(-2));
            let lastPosition = positionArr[positionArr.length-2];
            let nowPosition = positionArr[positionArr.length-1];
            let centerPosition = {
                x: lastPosition.x + (nowPosition.x - lastPosition.x) / 2,
                y: lastPosition.y + (nowPosition.y - lastPosition.y) / 2,
                z: lastPosition.z + (nowPosition.z - lastPosition.z) / 2,
            };
            return [
                    this.getDistance(positionArr),
                    viewer.entities.add({
                        position: centerPosition,
                        label: {
                            text : `${parseInt(length, 10)}米`,
                            font : '14pt monospace',
                            showBackground: true,
                            backgroundColor: Cesium.Color.BLACK.withAlpha(.5),
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth : 2,
                            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset : new Cesium.Cartesian2(0, -9),
                        }
                    }),
                    viewer.entities.add({
                        name: 'Red line',
                        polyline: {
                            positions: [lastPosition, nowPosition],
                            width: 2,
                            material: Cesium.Color.DODGERBLUE ,
                        },
                    })
                ]
        }
    },
    // 画面 pointArr存储经纬度
    addArea(viewer, pointArr, positionArr){
        // 画面
        let tempArr = [];
        for(let i=0; i<pointArr.length; i++){
            tempArr.push(pointArr[i].lng);
            tempArr.push(pointArr[i].lat);
            tempArr.push(pointArr[i].height);
        }

        // console.log(Cesium.Cartesian3.fromDegreesArray([...tempArr]))
        console.log(tempArr)
        if(tempArr.length !== 0){
          return [
              this.getArea(pointArr, positionArr),
              viewer.entities.add({
                  name : 'yellow polygon',
                  polygon : {
                      hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([...tempArr]),
                      material : Cesium.Color.DODGERBLUE.withAlpha(.6),
                      perPositionHeight : true
                  }
              })
          ]
        }
    },
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
    },

    // 计算多边形面积
    // 参数{ 经纬度， 世界坐标 }
    getArea(pointArr, positionArr) {
        var res = 0;
        //拆分三角曲面
        if(pointArr.length >=3){
            for(let i=2; i<pointArr.length; i++){
                var angle = this.Angle(pointArr[0], pointArr[i-1], pointArr[i]);
                res += this.getTriangleArea(angle, [positionArr[0], positionArr[i-1], positionArr[i]]);
            }
        }
        return res;
    },

    // 计算三角形的面积
    getTriangleArea(angle, pointArr){
        var dis_temp1 = this.getDistance([pointArr[0], pointArr[1]]);
        var dis_temp2 = this.getDistance([pointArr[1], pointArr[2]]);
        return dis_temp1 * dis_temp2 * Math.abs(Math.sin(angle * Math.PI / 180)) / 2;
    },

    // 获得线p2p1与p2p3的夹角（数值为角度值，如果要转化为弧度 还需要 * Math.PI / 180）
    Angle(p1, p2, p3) {
        var bearing21 = this.Bearing(p2, p1);
        var bearing23 = this.Bearing(p2, p3);
        var angle = bearing21 - bearing23;
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    },

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
        return angle;
    }
};

export default obj;
