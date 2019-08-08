const app = getApp();

// pages/my_orders/my_orders.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  accept: function (e) {
    let page = this;
    const userId = app.globalData.userId;
    console.log('event', e);
    const booking_id = e.currentTarget.dataset.id;
    wx.request({
      url: `http://localhost:3000/api/v1/users/54/bookings/${booking_id}`,
      // url: `http://localhost:3000/api/v1/users/${userId}/${booking_id}`,
      method: 'PUT',
      data: {status: 'accepted'},
      success: function (res) {
        // reload page
        wx.reLaunch({
          url: `/pages/my_orders/my_orders?userId=${userId}`,
        })
      }
    });
  },

  decline: function (e) {
    let page = this;
    const userId = app.globalData.userId;
    console.log('event', e);
    const booking_id = e.currentTarget.dataset.id;
    wx.request({
      url: `http://localhost:3000/api/v1/users/54/bookings/${booking_id}`,
      // url: `http://localhost:3000/api/v1/users/${userId}/${booking_id}`,
      method: 'PUT',
      data: { status: 'rejected' },
      success: function (res) {
        // reload page
        wx.reLaunch({
          url: `/pages/my_orders/my_orders?userId=${userId}`,
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    const userId = app.globalData.userId;
    wx.request({
      // url: `http://localhost:3000/api/v1/users/${userId}`,
      url: `http://localhost:3000/api/v1/users/54`,
      success: function (res) {
        console.log('res', res);
        var info_arr = res.data.requests;
        var obtained = [];
        for (var i=0; i<info_arr.length; i++){
          var booking_id = info_arr[i].booking_id;
          
          var buyer_name = info_arr[i].buyer_name;
          var buyer_avatar = info_arr[i].buyer_avatar;
          var buyer_id = info_arr[i].buyer_id;

          var booked_date = info_arr[i].booked_time;          
          var status = info_arr[i].status;
          
          var product_id = info_arr[i].product_id;
          var product_name = info_arr[i].product_name;
          var product_img = info_arr[i].product_img;
          var hash = {booking_id, buyer_name, buyer_avatar, booked_date, status, product_id, product_name, product_img, buyer_id};
          obtained.push(hash);          
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