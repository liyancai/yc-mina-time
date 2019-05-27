const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    wx.navigateTo({
      // url: '../logs/logs'
      url: '/football/pages/countdown/index'
    })
  },
})
