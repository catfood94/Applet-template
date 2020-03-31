<template>
  <div>
    <button @click="getSetting" class="page-body-button" type="primary">点击授权</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mediaContainer:''
      };
    },
    onReady: function(e) {
      // 使用 wx.createMapContext 获取 map 上下文
      this.createMediaContainer()
    },
    methods: {
      createMediaContainer(){
        this.mediaContainer = wx.createMediaContainer()
        console.log(this.mediaContainer);
      }

    },
    components: {}
  }</script>

<style scoped>
  #myMap {
    width: 100%;
    height: 300px;
  }
</style>
