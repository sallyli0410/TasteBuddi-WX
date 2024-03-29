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
    url: [],
    ingredients: [],
    inputs: [],
    product_id: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  formSubmit: function (event) {
    const data_hash = event.detail.value;
    console.log(data_hash);
    console.log(this.data.ingredients)
    const page = this;
    let name = data_hash.name;
    let description = data_hash.description;
    let ingredient1 = data_hash.ingredient;
    let lat = data_hash.lat;
    let long = data_hash.long;
    let image = page.data.url[0];
    let ingredient = page.data.ingredients;
    const user_id = app.globalData.userId;
    console.log('add_a_recipe ->', user_id)

    let request1 = {
      name: name,
      description: description,
      location_lat: lat,
      location_long: long,
      user_id: user_id,
      img_url: image
    };

    let ingredients_data = ingredient.join();
    console.log(ingredients_data, "this is the string of ingredients")

    let ingredient_1 = ingredient.concat(", ")

    let ingredients = ingredient_1.join(ingredients_data);
    console.log("this is the final string of ingredients", ingredients)

    wx.showToast({
      title: 'Product Created',
      icon: 'success',
      duration: 2000,
      mask: true
    })
    wx.request({
      // url: `http://localhost:3000/api/v1/products`,
      url: `${app.globalData.url}products`,
      method: 'POST',
      data: request1,
      success(res) {
        console.log('this is res', res)
        console.log('succeed');
        let array = page.data.product_id;
        array.push(res.data.id);
        page.setData({
          product_id: array
        })
        let request2 = {
          name: ingredients,
          product_id: parseInt(page.data.product_id[0])
        };
        console.log(22, request2)

        wx.request({
          url: `${app.globalData.url}products/${page.data.product_id[0]}/ingredients`,
          method: 'POST',
          data: request2,
          success(res) {
            console.log('this is res', res)
            console.log('succeed');
          }
        });
      }
    });

  },

  bindStartTimeChange: function (e) {
    let page = this;

    console.log('picker time value', e.detail.value)
    this.setData({
      currentStartTime: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    console.log('picker time value', e.detail.value)
    this.setData({
      currentEndTime: e.detail.value
    })
  },

  bindDateChange: function (e) {
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
            page.setData({ name, lat, long });
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


  takePhoto: function () {
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

  // add ingredients functions
  addIngredient: function (e) {
    let page = this;
    let i = e.target.dataset.index
    console.log('ingredient-data', e.detail.value);
    page.data.ingredients[i] = e.detail.value;
  },

  showBox: function (e) {
    let page = this;
    let i = e.target.dataset.index;
    let inputs = page.data.inputs
    inputs.push(true)
    page.setData({ inputs })
    console.log('display', page.data.display)
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