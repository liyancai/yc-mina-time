const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  },
  gotoHoliday() {
    wx.navigateTo({
      url: '/pages/holiday/index'
    })
  },
  gotoFootball() {
    wx.navigateTo({
      url: '/football/pages/countdown/index'
    })
  },
  gotoLife() {
    wx.navigateTo({
      url: '/life/pages/countdown/ymd'
    })
  }
})
