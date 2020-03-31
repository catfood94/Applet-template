<template>
  <view class="page">
    <view class="page__bd">
      <view class="section section_gap">
        <audio id="myAudio" :poster="current.poster" :name="current.name" :author="current.author" controls ></audio>
      </view>
    </view>

      <button @tap="getAvailableAudioSources">获取当前支持的音频输入源</button>
      <button @tap="createInnerAudioContext">创建音频实例</button>
      <button @tap="destroy">销毁当前音频实例</button>
      <van-notice-bar
        style="margin: 10px"
        left-icon="bullhorn-o"
        text="以下内容要先创建音频实例才能操作"
      />
      <button @click="onCanplay">可以进入播放状态</button>
      <button @click="playAudio">播放</button>
      <button @tap="pauseAudio">暂停</button>
      <button @tap="seek">跳转到30秒</button>
      <button @tap="stop">停止播放</button>

    <view class="section section_gap">
      <text class="section__title">进度</text>
      <view class="body-view">
        <slider @change="timeSliderChanged" :value="value" left-icon="cancel" right-icon="success_no_circle"/>
      </view>
    </view>
    <view class="section section_gap">
      <text class="section__title">调整音量</text>
      <view class="body-view">
        <slider min="0" max="10" @change="playbackRateSliderChanged" left-icon="cancel" right-icon="success_no_circle"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        current: {
          poster: 'https://p3fx.kgimg.com/stdmusic/20181124/20181124233623437968.jpg',
          name:'断绝来往',
          author: '陈帕宇',
        },
        audioAction: {
          method: 'pause'
        },
        value:0,
        audioCtx:'',
        duration:'',
      };
    },
    onReady: function(e) {

      this.createAudioContext()
      this.createInnerAudioContext()
      //事件，进入准备播放状态
      this.audioCtx.onCanplay((res)=>{

      });
      //事件，事件更新
      this.audioCtx.onTimeUpdate((res)=>{
        this.value = this.audioCtx.currentTime/this.audioCtx.duration *100;
        this.duration = this.audioCtx.duration
      });

    },
    methods: {
      //创建内部 audio 上下文 AudioContext 对象。
      createAudioContext() {
        this.audioCtx = wx.createAudioContext('myAudio');
      },
      //创建内部 audio 上下文 InnerAudioContext 对象。
      createInnerAudioContext() {
        this.audioCtx = wx.createInnerAudioContext('myAudio');
        this.audioCtx.src = 'https://webfs.yun.kugou.com/202003281114/b0b72dd23970c2faa60ffaf0f9257847/G004/M00/03/14/pIYBAFS997uAfsQwADNsB2orKFo493.mp3'
      },
      //设置音频的播放选项
      setInnerAudioOption() {
        wx.setInnerAudioOption({
          mixWithOther:true,  //混音，为true时播放音频不会停止其他应用和微信的音频
          obeyMuteSwitch:false, //ios的时候生效，为false时在静音模式下也能播放音频
          success(res){
            console.log(res);
          }
        })
      },
      //获取当前支持的音频输入源
      getAvailableAudioSources(e) {
        wx.getAvailableAudioSources({
          success(res){
            console.log(res.audioSources.auto); //自动设置
            console.log(res.audioSources.buildInMic); //ios手机麦克风
            console.log(res.audioSources.headsetMic); //ios耳机麦克风
            console.log(res.audioSources.mic); // 安卓麦克风
          }
        })
      },
      // 销毁当前音频实例
      destroy() {
        this.audioCtx.destroy()
      },
      // 播放音频
      playAudio() {
        this.audioCtx.play()
      },
      // 暂停音频
      pauseAudio() {
        this.audioCtx.pause()
      },
      // 跳转到指定位置
      seek() {
        this.audioCtx.stop();
        this.audioCtx.seek(30);
        setTimeout(()=>{this.audioCtx.play()},200);
      },
      // 停止播放
      stop() {
        this.audioCtx.stop()
      },
      // 调整进度条
      timeSliderChanged(e) {
        if (!this.duration)
          return;
        this.audioCtx.stop();
        this.audioCtx.seek(e.target.value*this.audioCtx.duration/100);
        setTimeout(()=>{this.audioCtx.play()},200);
      },
      //调整音量
      playbackRateSliderChanged(e) {
        this.audioCtx.volume = e.target.value/10
      },
    },
    components: {}
  }</script>

<style scoped>
  .intro {
    margin: 30px;
    text-align: center;
  }
</style>
