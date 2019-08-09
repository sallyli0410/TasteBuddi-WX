// pages/home/home.js
let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    ChefUrls: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1524772128034-3ecf9a73cbe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"],
    imgUrls: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
  },

  onLoad: function (options) {
    let page = this
    wx.request({
      url: 'https://tastebuddi.wogengapp.cn/api/v1/products',
      success: function (res) {
        console.log('giggles', res),
        page.setData({
          products: res.data.products,
          recommend: res.data.products.slice(0,4),
          trending: res.data.products.slice(5)
        })
      }
    })
    console.log('sliced', page.data.products.slice(1,2))
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