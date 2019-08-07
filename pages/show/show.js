// pages/show/show.js
const app = getApp()
const U = require('../../utils/util.js')

Page({


  /**
   * Page initial data
   */
  data: {
    currentDate: new Date().getTime(),
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    //console.log(options)
    let page = this
    let productId = options.productId

    let date = new Date();
    let currentDate = U.dateString(date);
    this.setData({
      currentDate
    })

    let time = new Date();
    let currentTime = U.timeString(time);
    this.setData({
      currentTime
    })

    wx.request({
      url: `http://localhost:3000/api/v1/products/${productId}`,
      success: function(res) {
        //console.log('res', res)
        const name = res.data.name
        const description = res.data.description
        const images = res.data.img_url
        const ingredients = res.data.ingredients
        const seller_name = res.data.seller.name
        const seller_avatar = res.data.seller.avatar
        const seller_id = res.data.user_id

        // locations
        const lat = res.data.location_lat;
        const long = res.data.location_long;
        
        page.setData({
          name: name,
          description: description,
          ingredients: ingredients,
          images: images,
          seller_name: seller_name,
          seller_avatar: seller_avatar,
          seller_id: seller_id,
          lat: lat,
          long: long,
          mk: [{
            latitude: lat,
            longitude: long,
            width: 40,
            height: 40
          }]
        });
        wx.hideToast();
      }
    });
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success(res) {
    //     //console.log('res', res)
    //     wx.openLocation({
    //       latitude: page.data.location_lat,
    //       longitude: page.data.location_long,
    //       scale: 28
    //     })
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })
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

  goToSeller: function(event) {
    console.log(33, event)
    // let id = event.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: `/pages/show/show?productId=${id}`
    // })
    wx.navigateTo({
      url: '/pages/seller/seller',
    })
  },

  bindFormSubmit: function(e) {
    // Local storage
    var review = e.detail.value.review
  },

  bindDateChange: function(e) {
    console.log('picker date value', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function(e) {
    console.log('picker time value', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  submitRequest: function(e) {
    let page = this;
    let date = this.data.date;
    let time = this.data.time;
    let product_id = this.data.product_id;
    //!IMPORTANT! user_id is the buyer's user_id
    let user_id = app.globalData.userId;

    let booking = {
      booking: {
        date: date,
        time: time,
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

    wx.request({
      url: `http://localhost:3000/api/v1/users/${useId}/bookings`,
      method: 'POST',
      data: booking,
      success() {

        console.log('succeed');
        wx.reLaunch({
          url: '/pages/home/home'
        });
      }
    });
  },

  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})