function request(url, data, successCb, errorCb, completeCb) {
  var sdata = objKeySort(data);
  /*var sign = "";
  var signVal = "";
  for(let item in sdata){
    // signVal += (item +'='+ JSON.stringify(sdata[item])+'&') 
    // signVal += (item + '=' + sdata[item] + '&') 
    //registerorlogin api without 'nickName' item
    if (sdata[item] != undefined && item !='nickName') {
      signVal += (item + '=' + sdata[item] + '&')
    }
  }
  signVal+=('key=WXAPP_CTFMALL');
  sign = MD5.md5(signVal);*/
  wx.request({
    url: url,
    method: 'POST',
    data: sdata,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      wx.hideLoading();
      if (res.statusCode == 200)
        utils.isFunction(successCb) && successCb(res.data);
      else
        console.log('请求异常', res);
    },
    fail: function () {
      wx.hideLoading();
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {

      utils.isFunction(completeCb) && completeCb();
    }
  }),
    wx.showLoading({
      title: '加载中',
    });
}

function objKeySort(obj) {//排序的函数
  var newkey = Object.keys(obj).sort();
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;//返回排好序的新对象
}


module.exports = {
  request: request
}