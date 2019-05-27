
Page({
  data: {
    db: null,
    fcList: []
  },
  onLoad: function (options) {
    this.setData({
      db: wx.cloud.database()
    })
    this.getData()
  },
  getData() {
    var that = this
    wx.showLoading({ title: '加载中…' })
    const coll = this.data.db.collection('fc-info')
    coll.where({
      active: true
    }).orderBy('sort', 'asc').get().then(res => {

      if (res.data.length > 0) {
        that.setData({
          fcList: res.data,
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  gotoDetail(event) {
    let fc = event.currentTarget.dataset.fc

    wx.navigateTo({
      url: 'detail?fc=' + fc
    })
  },
  onShareAppMessage(res) {
  }

})