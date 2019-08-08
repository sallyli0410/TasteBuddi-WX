// pages/add_recipe/add_recipe.js
import { $init, $digest } from '../../utils/common.util';
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');


Page({

  /**
   * Page initial data
   */
  data: {
    currentDate: new Date().getTime(),
    images: []
  },

  /**
   * Lifecycle function--Called when page load
   */

  formSubmit: function(event){
    console.log(event.detail.value)
    console.log(this.data.images)

    // if ( event.detail.value.item.length != 5 ){
    //   wx.reLaunch({
    //     url: '../chef-sign-up/chef-sign-up'
    //   })
    // } else {
    //   /* change chef data */
    //   wx.reLaunch({
    //     url: '../home/home'
    //   })
    // }
  },

  bindStartDateChange: function(e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },

  bindEndDateChange: function(e) {
    console.log('picker send selection modified. The carry value is ', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },

  onLoad(options) {
    $init(this)
    console.log(this.data.currentDate)
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 5 ? images : images.slice(0, 5)
        $digest(this)
      }
    })
  },

  takePhoto: function() {
        new AV.File('file-name', {
          blob: {
            uri: this.data.images[0],
          },
        }).save().then(
          file => console.log(file.url())
        ).catch(console.error);

  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],
      urls: images,
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

  }
})
