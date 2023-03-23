<template>
  <div id="container">
    <div id="map"></div>
    <el-form class="navigation">
      <el-form-item class="navigation-1st">
        <el-input
          type="text"
          id="start"
          v-model="start"
          placeholder="请输入起点"
          class="input-1st"
        />
        <br />
        <el-input
          type="text"
          id="end"
          v-model="end"
          placeholder="请输入终点"
          class="input-2st"
        />
        <br />
        <el-button class="navigation-2nd" type="button" @click="navigate()"
          >驾车</el-button
        >
        <el-button type="button" @click="navigate2()">公交</el-button>
        <!-- <el-button type="button" @click="navigate3()">骑行</el-button> -->
        <!-- <el-button type="button" @click="navigate4()">步行</el-button> -->
      </el-form-item>
    </el-form>
    <el-button
      size="mini"
      type="info"
      icon="el-icon-user"
      class="user"
      @click="toMy"
      circle
    ></el-button>
    <el-button
      size="mini"
      icon="el-icon-location-outline"
      type="primary"
      class="location"
      @click="getCurrentPosition()"
      circle
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      start: "",
      end: "",
      map: null,
      geocoder: null,
      center: {
        lng: 0,
        lat: 0,
      },
      model: {
        lng: "",
        lat: "",
        address: "",
      },
    };
  },
  methods: {
    // 驾车
    navigate() {
      let map = new BMap.Map("map"); // 创建地图实例
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      let start = this.start;
      let end = this.end;

      // this.geocoder.getPoint(start, (point) => {
      //   if (point) {
      //     console.log(point.lng, point.lat);
      //     start = new BMap.Point(point.lng, point.lat);
      //   } else {
      //     alert("地址解析失败");
      //   }
      // });
      // this.geocoder.getPoint(end, (point) => {
      //   if (point) {
      //     console.log(point.lng, point.lat);
      //     end = new BMap.Point(point.lng, point.lat);
      //   } else {
      //     alert("地址解析失败");
      //   }
      // });

      // 创建驾车路线实例
      let driving = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      });
      driving.search(start, end); // 根据起点和终点搜索驾车路线
    },
    // 公交
    navigate2() {
      let map = new BMap.Map("map"); // 创建地图实例
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      let start = this.start;
      let end = this.end;
      // 添加公交路线实例
      let transit = new BMap.TransitRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      });
      transit.search(start, end); // 根据起点和终点搜索公交路线
    },
    // 骑行
    navigate3() {
      let map = new BMap.Map("map"); // 创建地图实例
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      let start = this.start;
      let end = this.end;
      // 添加骑行路线实例
      let riding = new BMap.RidingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      });
      riding.search(start, end); // 根据起点和终点搜索驾车骑行路线
    },
    // 步行
    navigate4() {
      let map = new BMap.Map("map"); // 创建地图实例
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      let start = this.start;
      let end = this.end;
      // 添加步行路线实例
      let walking = new BMap.WalkingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      });
      walking.search(start, end); // 根据起点和终点搜索步行路线
    },
    // 获取当前定位
    getCurrentPosition() {
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((position) => {
        if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
          let map = new BMap.Map("map");
          let point = new BMap.Point(position.point.lng, position.point.lat);
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        } else {
          alert("定位失败，请检查您的网络连接和定位权限设置！");
        }
      });
    },
    toMy() {
      this.$router.push({ path: "/my" });
    },
  },
  mounted() {
    // 初始化地图
    this.map = new BMap.Map("map"); // 创建地图实例
    let point = new BMap.Point(116.404, 39.915); // 创建点坐标
    this.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和缩放级别
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // // 创建缩放控件实例
    // const zoomCtrl = new BMap.NavigationControl();
    // // 添加缩放控件到地图
    // this.map.addControl(zoomCtrl);

    // // 创建地图类型控件实例
    // const mapTypeCtrl = new BMap.MapTypeControl();
    // // 添加地图类型控件到地图
    // this.map.addControl(mapTypeCtrl);

    // 创建geocoder对象
    // this.geocoder = new BMap.Geocoder();

    const _this = this;
    // 添加地图点击事件
    this.map.addEventListener("click", function (e) {
      console.log("点击位置经纬度：" + e.point.lng + "," + e.point.lat);
      _this.center.lng = e.point.lng;
      _this.center.lat = e.point.lat;
      // 清除之前的标记
      _this.map.clearOverlays();
      // 创建点标记
      const point = new BMap.Point(_this.center.lng, _this.center.lat);
      // 获取位置信息
      const geocoder = new BMap.Geocoder();
      geocoder.getLocation(point, function (geocoderResult, LocationOptions) {
        // 清除之前的标记
        _this.map.clearOverlays();
        _this.map.addControl(new BMap.NavigationControl());
        const marker = new BMap.Marker(point);
        // 创建标注
        _this.map.addOverlay(marker);
        // 地址定位成功
        const address = geocoderResult.address;
        console.log("所处地址", address);
      });
    });
  },
};
</script>

<style lang="less" scoped>
#container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  #map {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  .navigation {
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 1;
    .navigation-1st {
      width: 350px;
      .input-2st,
      .navigation-2nd {
        margin-top: 20px;
      }
    }
  }

  .user {
    position: absolute;
    top: 10%;
    right: 10%;
    height: 50px;
    width: 50px;
    font-size: 20px;
  }
  .location {
    position: absolute;
    top: 20%;
    right: 10%;
    height: 50px;
    width: 50px;
    font-size: 20px;
  }
}
</style>
