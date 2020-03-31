import Vue from 'vue';
let v = new Vue();
const service = wx.request({

})



/*  axios.create({
  transformRequest: [function (data) {
    return data
  }],
  timeout:10000
//axios创建5秒以后返回
})*/

service.interceptors.request.use(config => { //设置拦截器
  if (config.method === 'post') { //如果是post请求的话，转json
    config.data = qs.stringify(config.data)
  }
  return config //返回数据
},error => {
  return Promise.reject(error) //崩溃的时候才会有
});
// 请求前拦截
service.interceptors.response.use(result => {
  if(result.data.code == 200){
    v.$message({
      message: '成功',
      type: 'success'
    });
  }else {
    v.$message.error(result.data.msg)
  }
  return result //返回结果
},error => {
  return Promise.reject(error)
})
//请求返回结果后拦截
export default service
