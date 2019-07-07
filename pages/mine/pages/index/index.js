// pages/mine/pages/index/index.js
const app = getApp();
var wcache = require("../../../../utils/wcache.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    userName:'',
    userImg:'../../../common/image/kind/user.png',
    payOrderNum:1,
    processOrderNum:3,
    finishOrderNum:0,
    cancelOrderNum:2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.remind == '1'){
      wx.showToast({
        title: '登陆失效，请重新登陆! >_<',
        icon:'none',
        duration: 3000,
      })
      return;
    }

    console.log(wcache.get('userInfo', ''))
    if(wcache.get('isLogin','')){
      that.setData({
        userName: wcache.get('userInfo', '').nickName,
        isLogin:true,
        userImg: wcache.get('userInfo', '').avatarUrl
      })
    }
    //wcache.remove('isLogin')
    //wcache.remove('userInfo')
  },

  getUserInfo : function(){
    var that = this;
    var userinfo = app.globalData.userInfo;
    if(userinfo == null || userinfo == '' || userinfo == undefined){
      app.showLoad();
      wx.getSetting({
        success(res) {
          console.log(res.authSetting)
          if (!res.authSetting["scope.userInfo"]){
            wx.navigateTo({
              url: '../../../common/pages/user/user',
            })
          }
          else{
            wx.getUserInfo({
              success: function (res) {
                //var userInfo = res.userInfo
                //var nickName = userInfo.nickName
                wcache.put('userInfo', res.userInfo,7200);
                wcache.put('isLogin',true,7200);
                that.setData({
                  userName: wcache.get('userInfo', '').nickName,
                  isLogin: true,
                  userImg: wcache.get('userInfo', '').avatarUrl
                })
              }
            })
          }
          app.hideLoad();
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    }
  },
  select_order:function(event){
    var that = this;
    var id = event.currentTarget.dataset.oid
    wx.navigateTo({
      url: '../order/order?order_id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})