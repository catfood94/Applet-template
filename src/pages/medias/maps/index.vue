<template>
  <div>
    <view class="page-section page-section-gap">
      <map
        id="myMap"
        style="width: 100%; height: 300px;"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        :show-location="true"
      ></map>
    </view>
    <view class="btn-area">
      <button @click="getCenterLocation" class="page-body-button" type="primary">获取位置</button>
      <button @click="getRegion" class="page-body-button" type="primary">获取视野范围</button>
      <button @click="getScale" class="page-body-button" type="primary">获取当前地图缩放</button>
      <button @click="includePoints" class="page-body-button" type="primary">缩放视野展示所有经纬度</button>
      <button @click="moveToLocation" class="page-body-button" type="primary">移动位置</button>

      <button @click="translateMarker" class="page-body-button" type="primary">移动标注</button>
      <!--<button @click="setCenterOffset" class="page-body-button" type="primary">中心点偏移量</button>-->
      <!--<button @click="getSkew" class="page-body-button" type="primary">获取倾斜角</button>-->
      <!--<button @click="getRotate" class="page-body-button" type="primary">获取旋转角</button>-->
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show:true,
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
          id: 1,
          latitude: 23.099994,
          longitude: 113.324520,
          name: "T.I.T 创意园"
        },{
          id: 2,
          latitude: 23.099994,
          longitude: 113.344520,
          name: "T. 创意园",
        },
          {
            id:3,
            latitude: 23.099994,
            longitude: 113.304520,
            iconPath: "/static/images/location.png",
          }
        ],

      };
    },
     onReady: function(e) {
      // 使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext("myMap");
      console.log(wx.getSystemInfoSync().SDKVersion);
    },
    methods: {
      //获取当前坐标
      getCenterLocation: function() {
        let that = this;
        this.mapCtx.getCenterLocation({
          success: function(res) {
            that.latitude = res.latitude;
            that.longitude = res.longitude;
            console.log(res.longitude); //经度
            console.log(res.latitude); //纬度
          }
        });
      },
      //获取当前地图的视野范围
      getRegion: function() {
        this.mapCtx.getRegion({
          success: function(res) {
            console.log(res.southwest); //西南角经纬度
            console.log(res.northeast); //东北角经纬度
          }
        });
      },
      //获取当前地图的缩放
      getScale: function() {
        this.mapCtx.getScale({
          success: function(res) {
            console.log(res.scale); //缩放值
          }
        });
      },
      // 缩放视野展示所有经纬度
      includePoints: function() {
        this.mapCtx.includePoints({
          padding: [10],
          // 显示地图的经纬度（大小）
          points: [{
            latitude: 23.10229,
            longitude: 113.3345211
          }, {
            latitude: 23.00229,
            longitude: 113.3345211
          }]
        });
      },
      // 移动位置
      moveToLocation: function() {
        //移动过去的地方
        this.latitude = 23.117456944614577;
        this.longitude = 113.42174653716428;
        this.mapCtx.moveToLocation({
          success: function(res) {
            console.log(res);
          }
        });
      },

      translateMarker: function() {
        this.mapCtx.translateMarker({
          markerId: 1,
          autoRotate: true,
          duration: 1000,
          destination: {
            latitude: 23.10229,
            longitude: 113.3345211
          },
          animationEnd() {
            console.log("animation end");
          }
        });
      }

      //获取当前地图的缩放
      /* getSkew: function () {
         this.mapCtx.getSkew({
           success: function(res){
             console.log(res.skew); //缩放值
           }
         })
       },*/
      //获取当前地图的旋转角 不知道为啥没作用
      /* getRotate: function () {
         this.mapCtx.getRotate({
           success: function(res){
             console.log(res.rotate); //旋转角
           },
           fail:function(err){
             console.log(err);
           },
           complete:function(res){
             console.log(res);
           }
         })
       },*/
      // 设置地图中心点偏移
     /* setCenterOffset: function() {
        this.mapCtx.setCenterOffset({
          offset:[1,1],
          success: function(res) {
            console.log(22);
            console.log(res); //中心点偏移量
          }
        });
      },*/
    },
    components: {}

  };</script>

<style scoped>
  #myMap {
    width: 100%;
    height: 300px;
  }
</style>
