let app = getApp()
// pages/marketplace/marketplace.js
Page({

  /**
   * Page initial data
   */
  data: {
    num: 3.5,
    one_1: '',
    two_1: '',
    tagsArray: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let page = this

    wx.request({
      url: 'http://localhost:3000/api/v1/products',
      success: function(res) {
        console.log(22, res)
        page.setData({
          products: res.data.products
        })

        let tagsArray = page.data.tagsArray
        page.data.products.forEach(p => {
          p.tags.forEach(t => {
            tagsArray.push(t);
          }
          )
        })

        page.setData({
          tagsArray
        })
      }
    })



    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num
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
  goToShow: function(event) {
    console.log(22, event)
    let id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/show/show?productId=${id}`
    })
  },
  
  
  filterTags: function (e) {
    let tagValue = e.currentTarget.dataset.tag
    let products = this.data.products
    let filteredProducts = []

    if(tagValue === 'all') {
      this.setData({
        products
      })
    } else {

      products.forEach(p => {
        if (p.tags.includes(tagValue)) {
          filteredProducts.push(p)
        }
      })

      this.setData({
        products: filteredProducts
      })
    }

  }
})

