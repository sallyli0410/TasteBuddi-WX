// pages/profile/profile.js
const app = getApp()

Page({
  

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    let name = app.globalData.userInfo.nickName
    let avatar = app.globalData.userInfo.avatarUrl
    console.log('userId', app.globalData.userId)
    page.setData({
      name: name,
      avatar: avatar
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

  goToMyProducts: function(event){
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // console.log(id)
    // wx.navigateTo({
    //   url: `/products/${id}/`,
    // })
    wx.navigateTo({
      url: '../my_products/my_products',
    })
  },


   goToMyOrders: function(event){
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: `/pages/show/show?productId=${id}`
    // })

    wx.navigateTo({
      url:'../my_orders/my_orders',
    })
  },

   goToMyPurchases: function(event){
    console.log(33, event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../my_purchases/my_purchases`
    })
  },
})
