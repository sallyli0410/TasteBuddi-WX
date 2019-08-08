// search-box.js
const app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    inputValue: ''
  },

  /**
   * Component methods
   */
  methods: {
    getLastPage() {
      return getCurrentPages().slice(-1)[0]
    },

    inputBind: function (e) {
      console.log(e)
      let page = this.getLastPage()
      console.log(11111, page)
      let inputValue = e.detail.value
      wx.request({
        url: `${app.globalData.url}products?query=${inputValue}`,
        success: function (res) {
          console.log(res)
          page.setData({ products: res.data.products })

        }
      })
    },
  }
})
