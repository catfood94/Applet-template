<template>
  <div>
    <view class="page-body">
      <view class="page-body-wrapper">
        <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
          <button type="primary" @tap="takePhoto">拍照</button>
          <button type="primary" @tap="startRecord">开始录像</button>
          <button type="primary" @tap="stopRecord">结束录像</button>
        <view class="preview-tips">预览</view>
        <image v-if="src" mode="widthFix" :src="src"></image>
        <video v-if="videoSrc" class="video" :src="videoSrc"></video>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cameraContext:"",
        src:"",
        videoSrc:""
      };
    },
    onReady(){
      // 使用 wx.createCameraContext 获取 map 上下文
      this.getCameraContext()
    },
    methods: {
      //授权保存到相册
      getCameraContext(){
        this.cameraContext = wx.createCameraContext()
      },
      takePhoto() {
        this.cameraContext.takePhoto({
          quality: 'high', //图片质量
          success: (res) => {
            console.log(res);
            this.src = res.tempImagePath
          }
        })
      },
      startRecord() {
        this.cameraContext.startRecord({
          success: (res) => {
            console.log('startRecord')
          }
        })
      },
      stopRecord() {
        this.cameraContext.stopRecord({
          success: (res) => {
              this.src = res.tempThumbPath;
              this.videoSrc = res.tempVideoPath
          }
        })
      },
    },
    components: {}
  }</script>

<style scoped>
  #myMap {
    width: 100%;
    height: 300px;
  }
</style>
