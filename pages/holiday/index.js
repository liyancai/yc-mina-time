
Page({
  data: {
    db: null,
    holiday: {},
    month: 0,
  },
  onLoad: function (options) {

    this.setData({
      db: wx.cloud.database(),
      month: new Date().getMonth()
    })

    this.getData()
  },
  getData() {
    var that = this
    wx.showLoading({ title: '加载中…' })
    const coll = this.data.db.collection('holiday')
    coll.orderBy('year', 'desc').get().then(res => {

      if (res.data.length > 0) {
        that.setData({
          holiday: res.data[0],
        })

        wx.setNavigationBarTitle({
          title: that.data.holiday.title
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: that.data.holiday.color,
        })
        wx.setBackgroundColor({
          backgroundColor: that.data.holiday.color,
          backgroundColorTop: that.data.holiday.color,
          backgroundColorBottom: that.data.holiday.color,
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
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
      title: '这里是关于' + that.data.holiday.title + '的信息。去围观一下吧！',
    }
  }

})