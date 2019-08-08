// pages/add_recipe/add_recipe.js
import { $init, $digest } from '../../utils/common.util';
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const U = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    images: [],
    url: []
  },

  /**
   * Lifecycle function--Called when page load
   */

  formSubmit: function(event){
    console.log(event.detail.value)
    const
    data_hash = event.detail.value
    const name = data_hash.name
    const description = data_hash.description
    const ingredients = data_hash.ingredients
    const location = data_hash.location
    const image = this.data.url[0]

    let request_product = {

      request: {
        name: name,
        description: description
      }
    }
    // console.log(this.data.images)
    // console.log(this.data.start_date)

    // let page = this;
    // let date = this.data.currentDate;
    // let time = this.data.time;
    // let product_id = this.data.product_id;
    // //!IMPORTANT! user_id is the buyer's user_id
    // let user_id = app.globalData.userId

    // let request = {

    //   request: {
    //     date: date,
    //     time: time,
    //     product_id: product_id,
    //     user_id: user_id,
    //     status: 0
    //   }
    // };
  },

  bindStartTimeChange: function(e) {
    let page = this;
    console.log('picker time value', e.detail.value)
    this.setData({
      currentStartTime: e.detail.value
    })
  },

  bindEndTimeChange: function(e) {
    console.log('picker time value', e.detail.value)
    this.setData({
      currentEndTime: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker date value', e.detail.value)
    this.setData({
      currentDate: e.detail.value,
    })
  },

  chooseLocation: function (e) {
    let page = this;
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log('res', res)
        wx.chooseLocation({
          success: function (res) {
            console.log('res2', res)
            const name = res.name;
            const lat = res.latitude;
            const long = res.longitude;
            page.setData({name, lat, long});
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    });
  },

  onLoad(options) {
    $init(this)
    console.log(this.data.currentDate)

    let date = new Date();
    let currentDate = U.dateString(date);
    this.setData({
      currentDate
    })

    let startTime = new Date();
    let currentStartTime = U.timeString(startTime);
    this.setData({
      currentStartTime
    })

    let endTime = new Date();
    let currentEndTime = U.timeString(endTime);
    this.setData({
      currentEndTime
    })
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
    let page = this;

    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 1 ? images : images.slice(0, 1)
        $digest(this)

        new AV.File('file-name', {
          blob: {
            uri: this.data.images[0],
          },
        }).save().then(
          file => {
            page.data.url.push(file.url())
            console.log('testing image', page.data.url[0])
        }).catch(console.error);

      }
    })

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
