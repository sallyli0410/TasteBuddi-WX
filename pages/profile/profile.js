// pages/profile/profile.js
const app = getApp()

Page({
  

  /**
   * Page initial data
   */
  data: {
    login: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this

    console.log('userId', app.globalData.userId)
    

    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting["scope.userInfo"]) {
          page.getUserInfo()
          page.setData({
            login: true
          })
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  goToMyRecipes: function(event){
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // console.log(id)
    // wx.navigateTo({
    //   url: `/products/${id}/`,
    // })
    wx.navigateTo({
      url: '../my_recipes/my_recipes',
    })
  },


   goToMyRequestsIn: function(event){
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: `/pages/show/show?productId=${id}`
    // })

    wx.navigateTo({
      url:'../my_requests_in/my_requests_in',
    })
  },

   goToMyRequestsOut: function(event){
    console.log(33, event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../my_requests_out/my_requests_out`
    })
  },

  getUserInfo: function (e) {
    let page = this
    // wx.getSetting({
    //   success: res => {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        const host = app.globalData.url
        // console.log(444, host)
        page.setData({
          name: app.globalData.userInfo.nickName,
          avatar: app.globalData.userInfo.avatarUrl
        })
        wx.request({
          url: host + 'users/' + app.globalData.userId,
          method: 'PUT',
          data: {
            wx_name: app.globalData.userInfo.nickName,
            wx_avatar: app.globalData.userInfo.avatarUrl
          },
          success: (res) => {
            console.log("viola", res)
            page.setData({login: true})
          }
        })
      }
    })
  }
})
