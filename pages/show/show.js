// pages/show/show.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentDate: new Date().getTime(),
    imgUrls: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  goToSeller: function(event){
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: `/pages/show/show?productId=${id}`
    // })
    wx.navigateTo({
      url: '/pages/seller/seller',
    })
  },

  bindFormSubmit: function (e) {
    // Local storage
    var review = e.detail.value.review
  },

  bindDateChange: function (e) {
    console.log('picker startdate value', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  submitRequest: function (e) {
    let page = this;
    let date = this.data.date;
    let product_id = this.data.product_id;

    //!IMPORTANT! user_id is the buyer's user_id
    let user_id = app.globalData.userId;
    let booking = {
      booking: {
        date: date,
        product_id: product_id,
        user_id: user_id,
        status: 0
      }
    };

    wx.showToast({
      title: 'Order Requested!',
      icon: 'succes',
      duration: 2000,
      mask: true
    })
    // send post request to api
    // wx.request({
    //   url: `https://gamestation.herokuapp.com/api/v1/users/${user_id}/bookings`,
    //   method: 'POST',
    //   data: booking,
    //   success() {
      
    //     console.log('succeed');
    //     // wx.reLaunch({
    //     //   url: '/pages/home/home'
    //     // });
    //     wx.redirectTo({
    //       url: '../rentals/rentals'
    //     });
    //   }
    // });
  },
})