// app.js
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')


App({

  onLaunch: function () {
AV.init({
  appId: config.lean_cloud_app_id,
  appKey: config.lean_cloud_app_key,
});

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

  this.checkLogin(); 
    
  },

  getUserInfo() {
    let page = this
    wx.getUserInfo({
      success: res => {
        page.globalData.userInfo = res.userInfo
        const host = page.globalData.url
        // console.log(444, host)
        wx.request({
          url: host + 'users/' + page.globalData.userId,
          method: 'PUT',
          data: {
            wx_name: page.globalData.userInfo.nickName,
            wx_avatar: page.globalData.userInfo.avatarUrl
          },
          success: (res) => {
            console.log("viola", res) 
            wx.switchTab({
            url: '../home/home'
            })
          }
        })
      }
    })
  },

  checkLogin: function() {
    let that = this
    wx.getSetting({
      success: res => {
          wx.login({
            success: res => {
              // that.getUserInfo(res)
              console.log(111, res)
              const host = that.globalData.url
              console.log(444, host)
              wx.request({
                url: host + 'login',
                method: 'POST',
                data: {
                  code: res.code
                },
                success: (res) => {
                  that.globalData.user = res.data;
                  console.log('SUCCESS???', res)
                  that.globalData.userId = res.data.userId
                  that.getUserInfo();

                },
              })
            }
          })

        // }

      }
    })
    
  },

  globalData: {
    userInfo: null,
    url: 'http://localhost:3000/api/v1/'
  }
})
