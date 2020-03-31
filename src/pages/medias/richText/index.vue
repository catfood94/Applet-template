<template>
  <div>
    <div>
      <van-tag type="success" size="large">只读，可以放入html</van-tag>
      <editor id="editor" class="ql-container" read-only="true">
      </editor>
    </div>
    <van-divider dashed />
    <div>
      <van-tag type="success" size="large">可编辑</van-tag>
      <editor id="editor1" class="ql-container" show-img-size show-img-toolbar show-img-resize :placeholder="data.placeholder" @statuschange="onStatusChange">
      </editor>
      <button @click="blur" class="page-body-button" type="primary">编辑器失焦</button>
      <button @click="clear" class="page-body-button" type="primary">清空编辑器内容</button>
      <view class="toolbar" @tap="format">
        <i class="iconfont icon-charutupian" @tap="insertImage"></i>
        <i :class="['iconfont icon-format-header-2',formats.header == 2 ? 'ql-active' : '']" data-name="header" data-value="2"></i>
        <i :class="['iconfont icon-format-header-3',formats.header == 3 ? 'ql-active' : '']" data-name="header" data-value="3"></i>
        <i :class="['iconfont icon-zitijiacu',formats.bold ? 'ql-active' : '']" data-name="bold"></i>
        <i :class="['iconfont icon-zitixieti',formats.italic ? 'ql-active' : '']" data-name="italic"></i>
        <i :class="['iconfont icon-zitixiahuaxian',formats.underline ? 'ql-active' : '']" data-name="underline"></i>
        <i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
        <i :class="['iconfont icon-youxupailie',formats.list == 'ordered' ? 'ql-active' : '']" data-name="list" data-value="ordered"></i>
        <i :class="['iconfont icon-wuxupailie',formats.list == 'bullet' ? 'ql-active' : '']"  data-name="list" data-value="bullet"></i>
      </view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formats: {},
        editorCtx:'',
        selectorQuery:'',
        data:{
          placeholder:'...请输入内容'
        }
      };
    },
    onReady(e){
      // 只读，初始化内容写在这里，写在@ready进页面有可能会没有加载好
      this.setContents()
      this.createSelectorQuery()
    },
    methods: {
      //只读初始化富文本内容
      setContents(){
        wx.createSelectorQuery().select('#editor').context((res)=>{
          this.selectorQuery = res.context;
          this.selectorQuery.setContents({
            html:`<div>123</div>
                  <div><img src="http://w8kj-1255336174.cossh.myqcloud.com/xgtf_applet/tf_union/imagetext/d7ac659d833cf21af1239b8352db4234.gif" width="30px" height="30px" data-custom="id=abcd&amp;role=god"></div>
                 <div>345</div> `,
            success(res){
              console.log(res);
            }
          })
        }).exec();
      },
      //获取可编辑富文本上下文
      createSelectorQuery(){
        wx.createSelectorQuery().select('#editor1').context((res)=>{
          this.editorCtx = res.context;
        }).exec();
      },
      //编辑器失焦
      blur(){
        this.editorCtx.blur({
          success(res){
            console.log(res);
          }
        })
      },
      //清空编辑器内容
      clear(){
        this.editorCtx.clear({
          success(res){
            console.log(res);
          }
        })
      },
      //改变字体格式
      format(e) {
        console.log(e);
        let { name, value } = e.target.dataset;
        if (!name) return;
        this.editorCtx.format(name, value)
      },
      //获取选择了哪几个样式
      onStatusChange(e) {
        this.formats = e.target;
        console.log(this.formats.bold);
      },
      //上传图片
      insertImage(){
        const that =this
        wx.chooseImage({
          count: 1, //最多可以选择的图片张数
          sizeType: ['original', 'compressed'], //original原图 ，compressed压缩图
          sourceType: ['album', 'camera'], //album从相册选择 camera打开相机拍摄
          success(res) {
            // 成功以后的图片地址
            that.editorCtx.insertImage({
              src: res.tempFilePaths[0],
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function () {
              }
            })
          }
        })
      }
    },
    components: {}
  }</script>

<style scoped>
  @import "../../../../static/css/iconfont.css";
  .toolbar {
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    width: 100%;
    position: fixed;
    left: 0;
    right: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ECECEC;
    border-left: none;
    border-right: none;
  }
  .ql-active {
    color: #22C704;
  }
</style>
