// pages/my_purchases/my_purchases.js
let app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    defaultStars: '/images/star-empty.png',
    fullStars: '/images/star-empty.png',
    halfStars: '/images/star-empty.png',
    rating: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    const userId = app.globalData.userId;
    wx.request({
      // url: `http://localhost:3000/api/v1/users/${userId}`,
      url: `${app.globalData.url}users/${userId}`,
      success: function (res) {
        console.log('res', res);
        var info_arr = res.data.bookings;
        var obtained = [];
        for (var i = 0; i < info_arr.length; i++) {
          var booked_time = info_arr[i].booked_time;
          var product_img = info_arr[i].product_img;
          var seller_avatar = info_arr[i].seller_avatar;
          var seller_name = info_arr[i].seller_name;
          var seller_id = info_arr[i].seller_id;
          var status = info_arr[i].status;
          var product_name = info_arr[i].product_name;
          var product_img = info_arr[i].product_img;
          var product_id = info_arr[i].product_id;
          var h = {
            booked_time, product_img, seller_avatar, seller_name, seller_id, status, product_name, product_img, product_id
          }
          obtained.push(h);
        }
        page.setData({
          obtained
        });
      }
    });
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

  }
})