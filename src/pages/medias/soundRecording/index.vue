<template>
  <div>
    <button @click="start" class="page-body-button" type="primary">点击录音</button>
    <button @click="pause" class="page-body-button" type="primary">暂停录音</button>
    <button @click="resume" class="page-body-button" type="primary">继续录音</button>
    <button @click="stop" class="page-body-button" type="primary">停止录音</button>
    <button @click="play" class="page-body-button" type="primary">播放录音</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recorder:"",
        audioCtx:"",
        file:"",
      };
    },
    onReady: function(e) {
      // 使用 wx.createMapContext 获取 map 上下文
      this.getSetting()
      this.getRecorderManager()
    },
    methods: {
      //授权保存到相册
      getSetting(){
        wx.getSetting({
          success (res) {
            let authSetting = res.authSetting;
            if(!authSetting['scope.record']){
              wx.openSetting({
                success (res) {
                  console.log(111);
                }
              })
            }
          }
        })
      },
      getRecorderManager(){
        this.recorder = wx.getRecorderManager()

        this.recorder.onStop((res)=>{
          console.log("stop");
          this.file = res
        })
      },
      //开始录音
      start(){
        this.recorder.start({
          duration:10000, // 录音最长时长
          sampleRate:8000, //采样率 越高越清晰，最高48000
          numberOfChannels:1, //录音通道数
          encodeBitRate:48000, //编码码率，具体可以根据采样率在小程序官网拿
          format:'mp3', // 音频格式
          frameSize: 50 //每一帧的大小
        });
      },
      //暂停录音
      pause(){
        this.recorder.pause();
      },
      //继续录音
      pause(){
        this.recorder.resume();
      },
      //停止录音
      pause(){
        this.recorder.stop();
      },
      //停止录音
      play(res){
          console.log(this.file); //录音后的暂时文件
          this.audioCtx = wx.createInnerAudioContext('');
          this.audioCtx.src = this.file.tempFilePath;
          this.audioCtx.play()
          console.log(this.audioCtx);
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
