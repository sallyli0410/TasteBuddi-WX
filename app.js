//app.js
App({
  onLaunch: function () {

    const host = 'http://localhost:3000/api/v1/';
    console.log('beginning login');

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // <----------login function----------->
    this.tologin()
    
    wx.login({
      success: (res) => {
        console.log(res)
        // insert next code here
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          // insert next code here
          success: (res) => {
            console.log(res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },

  toLogin: function () {
  const host = this.globalData.url;
    wx.request({
      url: host + 'login',
      method: 'post',
      data: {
        code: res.code
      },
      success: (res) => {
        console.log(res)
        this.globalData.userId = res.data.userId
      },
    })
  },
  
  globalData: {
    userInfo: null,
    url: 'http://localhost:3000/api/v1/'
  }
})