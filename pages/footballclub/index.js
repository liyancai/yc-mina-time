
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
    const coll = this.data.db.collection('fc-info')
    coll.get().then(res => {

      if (res.data.length > 0) {
        that.setData({
          fcList: res.data,
        })
      }
    })
  },

  gotoDetail(event) {
    let fc = event.currentTarget.dataset.fc

    wx.navigateTo({
      url: 'countdown?fc=' + fc
    })
  }
})