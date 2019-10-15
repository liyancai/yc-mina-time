const dateUtil = require('../../../utils/date.js')

Page({
  data: {
    interval: null,
    nowObj: {
      year: 0,
      month: 0,
      day: 0
    },
    dayPercent: 0,
    monthPercent: 0,
    yearPercent: 0,
    lifePercent: 0,
  },
  onLoad: function (options) {
    let now = new Date()
    let born = new Date(1986, 5 - 1, 7)

    let that = this
    this.setData({
      dayPercent: that.getPercent(dateUtil.hasPassDay(now), dateUtil.totalDay(), 4),
      monthPercent: that.getPercent(dateUtil.hasPassMonth(now), dateUtil.totalMonth(), 4),
      yearPercent: that.getPercent(dateUtil.hasPassYear(now), dateUtil.totalYear(), 6),
      lifePercent: that.getPercent(dateUtil.hasPassLife(born, now), dateUtil.totalLife(), 2),

      nowObj: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      },

      interval: setInterval(function () {
        now = new Date()
        that.setData({
          dayPercent: that.getPercent(dateUtil.hasPassDay(now), dateUtil.totalDay(), 4),
          monthPercent: that.getPercent(dateUtil.hasPassMonth(now), dateUtil.totalMonth(), 4),
          yearPercent: that.getPercent(dateUtil.hasPassYear(now), dateUtil.totalYear(), 6),
          lifePercent: that.getPercent(dateUtil.hasPassLife(born, now), dateUtil.totalLife(), 2),

          nowObj: {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
          },
        })
      }, 1000)
    })
  },
  onUnload: function () {
    clearInterval(this.data.interval)
  },

  //剩余时间百分比
  getPercent(value, total, fixed) {
    return (100 - 100 * value / total).toFixed(fixed)
  },

  back2Home() {
    let fcListPage = '/pages/index/index'
    let pages = getCurrentPages();
    if (pages.length == 1) {
      wx.reLaunch({
        url: fcListPage
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: '时间余额还有多少？快来围观一下吧！',
    }
  }
})
