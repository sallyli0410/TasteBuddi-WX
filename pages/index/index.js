// //index.js
// //获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
    app.checkLogin();
    console.log('onload userInfo', app.globalData.userInfo)
  },

  // New User based on app.js check

  getUserInfo: function (e) {
    app.checkLogin()
  }
})