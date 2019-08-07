let app = getApp()
// pages/marketplace/marketplace.js
Page({

  /**
   * Page initial data
   */
  data: {
    num: 3.5,
    one_1: '',
    two_1: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let page = this

    wx.request({
      url: 'http://localhost:3000/api/v1/products',
      success: function(res) {
        console.log(res)
        page.setData({
          products: res.data.products
        })
      }
    })

    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num
    })

  

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  goToShow: function(event) {
    console.log(22, event)
    let id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/show/show?productId=${id}`
    })
  },
})