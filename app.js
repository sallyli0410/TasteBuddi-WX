// app.js
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')


App({

  onLaunch: function () {
  AV.init({
    appId: config.lean_cloud_app_id,
    appKey: config.lean_cloud_app_key,
  });

  // 展示本地存储能力
  var logs = wx.getStorageSync('logs') || []
  logs.unshift(Date.now())
  wx.setStorageSync('logs', logs)
    
  // this.checkLogin();
// get the user ID from local storage
// if it exists, set it global data and redirect
// if it does not exist, login

  let userId = wx.getStorageSync("userId")
  console.log(66, userId)
  if (userId !== "" || undefined) {
    this.globalData.userId = userId;
    wx.switchTab({
      url: 'pages/home/home',
    })
  }
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
                  // save userID to local storage 
                
                  that.globalData.userId = res.data.userId
                  wx.setStorage({
                    key: 'userId',
                    data: res.data.userId,
                  })
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
    url: 'https://tastebuddi.wogengapp.cn/api/v1/'
    // url: 'http://localhost:3000/api/v1/'

  }
})
