<template>
  <div>
    <view class="page-body">
      <view class="page-section tc">
        <video id="myVideo" src="https://goss.vcg.com/static/video/videoList3.mp4" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
        <view class="weui-cells">
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
              <view class="weui-label">弹幕内容</view>
            </view>
            <view class="weui-cell__bd">
              <input @blur="bindInputBlur" class="weui-input" type="text" placeholder="在此处输入弹幕内容" />
            </view>
          </view>
        </view>
        <view class="btn-area">
          <button @click="bindSendDanmu" class="page-body-button" type="primary" formType="submit">发送弹幕</button>
          <button @click="bindPlay" class="page-body-button" type="primary">播放</button>
          <button @click="bindPause" class="page-body-button" type="primary">暂停</button>
          <button @click="playbackRate" class="page-body-button" type="primary">设置倍速</button>
          <button @click="requestFullScreen" class="page-body-button" type="primary">进入全屏</button>
          <button @click="seek" class="page-body-button" type="primary">跳转到指定位置</button>
          <button @click="stop" class="page-body-button" type="primary">停止播放</button>
          <button @click="saveVideoToPhotosAlbum" class="page-body-button" type="primary">保存视频到系统相册</button>
          <button @click="chooseMedia" class="page-body-button" type="primary">拍摄或从手机相册中选择图片或视频</button>
        </view>
      </view>
    </view>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        src: '',
        videoContext: '',
        danmuList:
          [{
            text: '第 1s 出现的弹幕',
            color: '#ff0000',
            time: 1
          },
            {
              text: '第 3s 出现的弹幕',
              color: '#ff00ff',
              time: 3
            }]
      };
    },
    onReady: function(e) {
      // 使用 wx.createMapContext 获取 map 上下文(弹幕依赖)
      this.videoContext = wx.createVideoContext('myVideo')
    },
    methods: {
      //保存视频到相册
      saveVideoToPhotosAlbum(){
        wx.downloadFile({
          url: 'https://goss.vcg.com/static/video/videoList3.mp4',
          success(res){
            console.log(res);
            let tempFilePath = res.tempFilePath
            wx.saveVideoToPhotosAlbum({
              filePath: tempFilePath,
              success (res) {
                console.log(res)
              }
            })
          }
        })
      },
      //拍摄或从手机相册中选择图片或视频
      chooseMedia(){
        wx.chooseMedia({
          count: 2, //最多能选择视频的数量
          mediaType: ['image','video'], //选择的类型
          sourceType: ['album', 'camera'], //album从相册选择，camera打开相机拍摄
          maxDuration: 30, //拍摄视频最长时间 3~30S
          sizeType: ['original', 'compressed'], //original原图 ，compressed压缩图(选择图片时)
          camera: 'back', //使用前置或者后置摄像头
          success(res) {
            console.log(res);
            console.log(res.tempFiles[0].tempFilePath); //本地路径
            console.log(res.tempFiles[0].size) ;//临时文件大小
            console.log(res.tempFiles[0].duration); //视频时间长度
            console.log(res.tempFiles[0].duration); //视频高度
            console.log(res.tempFiles[0].width) ;//视频宽度
            console.log(res.tempFiles[0].thumbTempFilePath) //视频压缩图临时本地路劲
          }
        })
      },

      //获取弹幕内容
      bindInputBlur(e) {
        this.inputValue = e.target.value
      },
      //退出全屏
      exitFullScreen() {
        this.videoContext.exitFullScreen()
      },
      //隐藏状态栏，仅在ios全屏有效
      exitFullScreen() {
        this.videoContext.hideStatusBar()()
      },
      //播放
      bindPlay() {
        this.videoContext.play()
      },
      //暂停
      bindPause() {
        this.videoContext.pause()
      },
      //设置倍速播放
      playbackRate() {
        this.videoContext.playbackRate(1.5) //0.5/0.8/1.0/1.25/1.5，2.6.3 起支持 2.0 倍速
      },
      //进入全屏
      requestFullScreen() {
        this.videoContext.requestFullScreen() //0 正常竖向 90 逆时针90度 -90 顺时针90度
      },
      //跳转到视频指定位置
      seek() {
        this.videoContext.seek(12) //number 单位：s
      },
      //显示状态栏，仅在ios全屏下有效
      showStatusBar() {
        this.videoContext.showStatusBar()
      },
      //停止视频
      stop() {
        this.videoContext.seek(0) //微信问题无法跳到一开始，所以先把进度跳回0
        this.videoContext.stop()
      },
      //发送弹幕
      bindSendDanmu () {
        this.videoContext.sendDanmu({
          text: this.inputValue,
          color: this.getRandomColor()
        })
      },

      //输出视频错误信息
      videoErrorCallback(e){
        console.log('视频错误信息:')
        console.log(e.detail.errMsg)
      },
      //随机颜色
      getRandomColor () {
        const rgb = []
        for (let i = 0 ; i < 3; ++i){
          let color = Math.floor(Math.random() * 256).toString(16)
          color = color.length == 1 ? '0' + color : color
          rgb.push(color)
        }
        return '#' + rgb.join('')
      }
    },
    components: {}
  }
</script>

<style scoped>
  page {
    background-color: #F8F8F8;
    height: 100%;
    font-size: 32rpx;
    line-height: 1.6;
  }

  .page-body {
    padding: 20rpx 0;
  }

  .btn-area{
    margin-top: 60rpx;
    box-sizing: border-box;
    width: 100%;
    padding: 0 30rpx;
  }

  .tc{
    text-align: center;
  }
  .weui-cells{
    margin-top: 80rpx;
    text-align: left;
  }
  .weui-label{
    width: 5em;
  }

  .page-body-button {
    margin-bottom: 30rpx;
  }
</style>
