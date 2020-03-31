<template>
  <div>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(value,index) in list"
        :key="index"
        :icon=value.icon
        @click="open(value.to)"
        :text=value.text
      />
    </van-grid>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello',
        list:[
          {icon:'shop',text:'地图',to:'../medias/maps/main'},
          {icon:'photo',text:'图片',to:'../medias/imgs/main'},
          {icon:'video',text:'视频',to:'../medias/video/main'},
          {icon:'volume',text:'音频',to:'../medias/voice/main'},
          {icon:'music',text:'背景音频',to:'../medias/backgroundAudio/main'},
          {icon:'clock',text:'实时音视频',to:'../medias/realTime/main'},
          {icon:'service',text:'录音',to:'../medias/soundRecording/main'},
          {icon:'photograph',text:'相机',to:'../medias/photo/main'},
          {icon:'chat',text:'富文本',to:'../medias/richText/main'},
          {icon:'friends',text:'音视频合成',to:'../medias/synthesis/main'}
          ],
      }
    },
    methods: {
      open(res){
        wx.navigateTo({
          url:res,
        })
      }
    },
    components:{
    }

  }
</script>

<style scoped>
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }
</style>
