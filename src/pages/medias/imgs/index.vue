<template>
  <div>
    <image style="width: 100%; background-color: #eeeeee;" :src="src" mode="widthFix"></image>
    <button @click="getSetting" class="page-body-button" type="primary">点击授权</button>
    <button @click="saveImageToPhotosAlbum" class="page-body-button" type="primary">保存图片</button>
    <button @click="previewImage" class="page-body-button" type="primary">全屏预览图片</button>
    <button @click="getImageInfo" class="page-body-button" type="primary">获取图片信息</button>
    <button @click="compressImage" class="page-body-button" type="primary">压缩图片</button>
    <button @click="chooseMessageFile" class="page-body-button" type="primary">在对话框选择图片</button>
    <button @click="chooseImage" class="page-body-button" type="primary">在相册选择图片</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src:"/static/images/user.png"
      };
    },
    onReady: function(e) {
      // 使用 wx.createMapContext 获取 map 上下文

    },
    methods: {
      //授权保存到相册
      getSetting(){
        wx.getSetting({
          success (res) {
            let authSetting = res.authSetting;
            if(!authSetting['scope.writePhotosAlbum']){
              wx.openSetting({
                success (res) {
                }
              })
            }
          }
        })
      },
      // 保存图片
      saveImageToPhotosAlbum() {
        wx.showLoading({
          title: '保存中...',
          mask: true,
        });
        wx.saveImageToPhotosAlbum({
                filePath:  '/static/images/user.png',
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  });
                },
                fail(res) {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'success',
                    duration: 2000
                  });
                }
              });
      },
      //全屏预览图片
      previewImage(){
        wx.previewImage({
          current: 'https://newqft.quanfangtongvip.com/qft/files/company_153/delivery_pdf/file/20191223154216739830809.png', // 当前显示图片的http链接
          urls: ['https://newqft.quanfangtongvip.com/qft/files/company_153/delivery_pdf/file/20191223154216739830809.png'] // 需要预览的图片http链接列表
        })
      },
      //获取图片信息
      getImageInfo() {
        wx.getImageInfo({
          src: "/static/images/user.png",
          success(res){
            console.log(res);
          }
        })
      },
      //压缩图片
      compressImage() {
        wx.compressImage({
          src: '/static/images/topLunbo1.jpg', // 图片路径
          quality: 80, // 压缩质量
          success(res){
            tempFilePath: '/static/images/';
            console.log(res);
          }
        })
      },
      //在对话框选择图片
      chooseMessageFile() {
        wx.chooseMessageFile({
          count: 10, //最多可以选择的图片张数
          type: 'image',
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFiles
            console.log(res);
          }
        })
      },
      //在本地相册选择图片
      chooseImage() {
        wx.chooseImage({
          count: 2, //最多可以选择的图片张数
          sizeType: ['original', 'compressed'], //original原图 ，compressed压缩图
          sourceType: ['album', 'camera'], //album从相册选择 camera打开相机拍摄
          success(res) {
            // 成功以后的图片地址
            const tempFilePaths = res.tempFilePaths
            console.log(res);
          }
        })
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
