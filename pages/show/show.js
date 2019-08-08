// pages/show/show.js
const app = getApp()
const U = require('../../utils/util.js')

// mapapi
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  /**
   * Page initial data
   */
  data: {
    currentDate: new Date().getTime(),
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // num: avg_rating,
    one_1: '',
    two_1: ''
  },
 

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'NX5BZ-O4UC6-VWKSI-MJHJU-NDYZJ-RPFVL'
    });

    //console.log(options)
    let page = this
    let productId = options.productId

    let date = new Date();
    let currentDate = U.dateString(date);
    page.setData({
      currentDate
    })

    let time = new Date();
    let currentTime = U.timeString(time);
    page.setData({
      currentTime
    })

    wx.request({
      url: `${app.globalData.url}products/${productId}`,
      success: function(res) {
        console.log('res', res)
        const name = res.data.name;
        const description = res.data.description;
        const images = res.data.img_url;
        const ingredients = res.data.ingredients;
        const avg_rating = res.data.avg_rating;
        const seller_name = res.data.seller.name;
        const seller_avatar = res.data.seller.avatar;
        const seller_id = res.data.user_id;
        // product location
        const lat = res.data.location_lat;
        const long = res.data.location_long;
        
        page.setData({
          name,
          description,
          ingredients,
          avg_rating,
          images,
          seller_name,
          seller_avatar,
          seller_id,
          lat,
          long,
          mk: [{
            latitude: lat,
            longitude: long,
            width: 40,
            height: 40
          }]
        });

        // get current user location
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            const c_lat = res.latitude;
            const c_long = res.longitude;
            const speed = res.speed;
            const accuracy = res.accuracy;
            page.setData({ c_lat, c_long, speed, accuracy });

            // calculate distance
            qqmapsdk.calculateDistance({
              from: `${page.data.c_lat},${page.data.c_long}`, 
              to: `${page.data.lat},${page.data.long}`, 
              success: function (res) {
                const distance = res.result.elements[0].distance / 1000;
                page.setData({distance});
              },
              fail: function (error) {
                console.error(error);
              }
            });

          }
        });

        wx.hideToast();
      }

    })

    this.setData({
      // one_1: this.data.num,
      two_1: 4 - avg_rating
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
    let page = this;
    let date = this.data.date;
    let time = this.data.time;
    let product_id = this.data.product_id;
    //!IMPORTANT! user_id is the buyer's user_id
    let user_id = app.globalData.userId

    let request = {
      request: {
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
      url: `${app.globalData.url}users/${user_id}/bookings`,
      method: 'POST',
      data: request,
      success() {
        console.log('succeed');
        wx.redirectTo({
          url: '/pages/home/home'
        });
      }
    });
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

  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }
})