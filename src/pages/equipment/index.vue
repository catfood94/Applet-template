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
          {icon:'shop',text:'地图',to:'../equipment/peripheral/main'},
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
