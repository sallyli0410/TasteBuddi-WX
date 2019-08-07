//app.js
App({
  onLaunch: function () {
    console.log('launching')

    // this.checkLogin(); 
    
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
        // if (res.authSetting['scope.userInfo']) {
        //   that.getUserInfo();
        // } else {

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