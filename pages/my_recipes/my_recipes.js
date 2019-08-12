// pages/my_products/my_products.js
let app = getApp()
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
    let page = this;
    const userId = app.globalData.userId;
    console.log('userID',userId),
    wx.request({
      // url: `http://localhost:3000/api/v1/users/${userId}`,
      url: `${app.globalData.url}users/${userId}`,
      success: function (res) {
        console.log('res', res);
        var info_arr = res.data.products;
        var obtained = [];
        for (var i = 0; i < info_arr.length; i++) {
          var product_name = info_arr[i].name;
          var product_img = info_arr[i].img_url;
          var product_id = info_arr[i].id;
          var product_description = info_arr[i].description;
          var h = {
            product_name, product_img, product_id, product_description
          };
          obtained.push(h);
        }
        page.setData({obtained});  
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

  }, 

  addRecipe: function() {
    wx.redirectTo({
      url: '/pages/add_recipe/add_recipe'
    });
  },

  del: function (e) {
    let page = this;
    const userId = app.globalData.userId;
    const product_id = e.currentTarget.dataset.id;
    wx.request({
      url: `https://tastebuddi.wogengapp.cn/api/v1/products/${product_id}`,
      // url: `http://localhost:3000/api/v1/products/${product_id}`,
      method: 'DELETE',
      success: function (res) {
        // reload page
        wx.reLaunch({
          url: '/pages/profile/profile',
        })
      }
    });
  },



})