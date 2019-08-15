// pages/home/home.js
let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    imgUrls: ["https://lc-xjkg6hep.cn-n1.lcfile.com/bf1415606a924fd4af1c/jonathan-borba-YRg1q2qCq8A-unsplash.jpg", "https://lc-xjkg6hep.cn-n1.lcfile.com/3898647a43de0b52d5ef/pexels-photo-2403391.jpg","https://lc-xjkg6hep.cn-n1.lcfile.com/f42ad86df2a6fbe23e96/pexels-photo-1439328.jpeg"],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
  },

  onLoad: function (options) {
    let page = this
    wx.request({
      url: `${app.globalData.url}products`,
      success: function (res) {
        console.log('giggles', res),
        page.setData({
          products: res.data.products,
          recommend: res.data.products.slice(0,4),
          trending: res.data.products.slice(5)
        })
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
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  goToShow: function (event) {
    console.log(22, event)
    let id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/show/show?productId=${id}`
    })
  },
})