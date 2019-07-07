//app.js
var wcache = require("utils/wcache.js")

App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success(res){
        wcache.put('code',res.code,300)
        console.log(res.code)
        if(!res.code){
          wx.request({
            url: that.globalData.httpUrl,
            data:{
              code:res.code,
              method:"pointer.get.openid"
            },
            dataType:"json"
          })
        }
      }
    })
  },
  hzk:{
    appId:"wx3e81dafabba4aa4c",
    flyId:"gh_168356530407",
    email:"hzk0307@qq.com"
  },
  globalData: {
    userInfo: null,
    isLoading:false,
    httpUrl:"https://hzkspace.com/service/pointerMiniProgram/",
  },
  showLoad() {
      wx.showToast({
        title: '正在加载',
        //icon: 'image/img_icon/icon_loading.png',
        duration: 5000
      })
  },
  hideLoad() {
    wx.hideToast()
  },

  checkLogin:function(url){
    var that = this;
    var userinfo = wcache.get("userInfo",'');
    if ( userinfo == "" ){
      wx.reLaunch({
        url: url+'remind=1',//remind=1提醒用户登录弹窗
      })
    }
  }
})