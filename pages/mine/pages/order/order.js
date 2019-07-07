var a=[],b=[],c=[],d=[];
var content = [a,b,c,d]
var tab = ['待支付', '进行中', '已完成','已取消'];

var app = getApp();
var wcache = require("../../../../utils/wcache.js");
var request = require("../../../../utils/request.js");

Page({
  data: {
    tab: tab,
    content: content,
    orderdata:'',
    tab_height: '60rpx',
    height:0,
    systeminfo: app.globalData.systemInfo,
    swiperselected: 0,
    tabselected: 0,
    deleteImg:'../../../../image/img_icon/shanchu.png',
  },
  onLoad: function (options){
    var that = this;
    app.checkLogin("../index/index?");
    console.log(options.order_id)
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        let h = 750 * res.windowHeight / res.windowWidth
        console.log(h);
        that.setData({
          height:h
        })
      }
    })

    if(options.order_id != null && options.order_id != undefined){
      that.setData({
        tabselected: options.order_id
      })
    }
    
    var openId = wcache.get('openId','')
    if(openId == ''){
      that.getOrder(options.order_id);
    }
  },
  bindTabTap: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id)
    app.checkLogin("../index/index?");
    that.setData({
      swiperselected: e.currentTarget.dataset.id,
      tabselected: e.currentTarget.dataset.id
    });
    
    that.getOrder(e.currentTarget.dataset.id)
  },
  swiperChange: function (e) {
    var that = this;
    console.log(e);
    app.checkLogin("../index/index?");
    that.setData({
      tabselected: e.detail.current
    });
    that.getOrder(e.detail.current)
  },
  forbidSwiperMove: function () {
    // 如果要禁止左右滑动在swiper写 catchtouchmove="forbidSwiperMove"
  },

  //订单查询
  getOrder:function(id){
    var that = this;
    if(id==0){
      console.log(12)
      a = [{ "orderno": "125434625436", "imageurl": "http://wwwwwgfg", "orderStatus": "1" }, { "orderno": "80809-090", "imageurl": "http://www435435wwgfg", "orderStatus": "1" }];
      that.setData({
        content:[a,b,c,d],
      })
      console.log(that.data.content)
    }

    //request.request({

    //})
  }
});