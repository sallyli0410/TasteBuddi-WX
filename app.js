//app.js
App({
  onLaunch: function () {
    console.log('launching')

    this.checkLogin(); 
    
  },

  getUserInfo: function (res) {

    let that = this
    const host = this.globalData.url;
    wx.request({
      url: host + 'login',
      method: 'POST',
      data: {
        code: res.code
      },
      success: (res) => {
        that.globalData.user = res.data;
        
      },
    })
    // create_table "users", force: : cascade do | t |
    //   t.string "wx_id"
    // t.string "wx_name"
    // t.string "wx_avatar"
    // t.string "phone_number"
    // t.boolean "seller_complete"
    // t.datetime "created_at", null: false
    // t.datetime "updated_at", null: false
  },

  checkLogin: function() {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              
              wx.switchTab({
                url: '../home/home'
              })

            }
          })
        } else {

          wx.login({
            success: res => {
              that.getUserInfo(res)
            }
          })

        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    url: 'http://localhost:3000/api/v1/'
  }
})