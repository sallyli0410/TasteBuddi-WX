// //index.js
// //获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
    // app.checkLogin();
    // console.log('onload userInfo', app.globalData.userInfo)


    let page = this
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting["scope.userInfo"]){
          page.getUserInfo()
        }
      

      }
    })
  },

  // New User based on app.js check

  getUserInfo: function (e) {
      let page = this
      // wx.getSetting({
      //   success: res => {
          wx.getUserInfo({
            success: res => {
             app.globalData.userInfo = res.userInfo
              const host = app.globalData.url
              // console.log(444, host)
              wx.request({
                url: host + 'users/' + app.globalData.userId,
                method: 'PUT',
                data: {
                  wx_name: app.globalData.userInfo.nickName,
                  wx_avatar: app.globalData.userInfo.avatarUrl
                },
                success: (res) => {
                  console.log("viola", res)
                  
                  wx.switchTab({
                    url: '../profile/profile'
                  })
                }
              })
            }
          })
      //   }
      // })
  }
    })