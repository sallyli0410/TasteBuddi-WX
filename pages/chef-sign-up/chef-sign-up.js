// pages/chef-sign-up/chef-sign-up.js
Page({

  /**
   * Page initial data
   */
  data: {
    items : [
      {value: 'Cooking environment is clean and hygienic.', name: '1'},
      {value: 'Chefs wear clean and proper clothing at all phases of cooking, and maintains good personal hygiene.', name: '2'},
      {value: 'Frozen foods are thawed under refrigeration, in a microwave, cooked to a proper temperature from a frozen state or in cold running water.', name: '3'},
      {value: 'Clean reusable towels are used only for sanitizing equipment and surfaces.', name: '4'},
      {value: 'Confirm that the information given in this form is true, complete and accurate.', name: '5'},
    ]
  },

  formSubmit: function(event){
    console.log(event.detail.value)

    if ( event.detail.value.item.length != 5 ){
      wx.reLaunch({
        url: '../chef-sign-up/chef-sign-up'
      })
    } else {
      /* change chef data */
      wx.reLaunch({
        url: '../home/home'
      })
    }
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

  }
})
