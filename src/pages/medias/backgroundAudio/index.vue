<template>
  <div>
    <button @click="pause" class="page-body-button" type="primary">暂停播放</button>
    <button @click="play" class="page-body-button" type="primary">开始播放</button>
    <button @click="seek" class="page-body-button" type="primary">跳转</button>
    <button @click="stop" class="page-body-button" type="primary">停止播放</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        backgroundAudio:''
      };
    },
    onReady: function(e) {
      // 获取背景音频
      this.backgroundAudio = wx.getBackgroundAudioManager();
      console.log(this.backgroundAudio);
      this.backgroundAudio.src = 'https://webfs.yun.kugou.com/202003281114/b0b72dd23970c2faa60ffaf0f9257847/G004/M00/03/14/pIYBAFS997uAfsQwADNsB2orKFo493.mp3'
      this.backgroundAudio.title = '背景音乐'
    },
    methods: {
      //暂停播放
      pause(){
        this.backgroundAudio.pause()
      },
      //开始播放
      play(){
        this.backgroundAudio.play()
      },
      //跳转
      seek(){
        this.backgroundAudio.seek(30)
      },
      //暂停播放
      stop(){
        this.backgroundAudio.stop()
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
