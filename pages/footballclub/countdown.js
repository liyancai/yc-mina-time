const dateUtil = require('../../utils/date.js')
const util = require('../../utils/util.js')

Page({
  data: {
    db: null,
    timer: null,
    event: null,
    imgList: [],
    eventHasPassTime: {}
  },
  onLoad: function (options) {
    this.setData({
      db: wx.cloud.database()
    })

    let fc = options.fc
    this.getEvent(fc)
  },
  onUnload: function () {
    clearInterval(this.data.timer)
  },
  getEvent(fc) {
    var that = this
    const coll = this.data.db.collection('event-info')
    coll.where({
      fc: fc,
      active: true
    }).get().then(res => {

      if (res.data.length > 0) {
        that.setData({
          event: res.data[0],
        })

        that.data.event.content.forEach(v => {
          if (v.type == 'image') {
            that.data.imgList.push(v.value)
          }
        });

        wx.setNavigationBarTitle({
          title: that.data.event.fc_name
        })
        wx.setNavigationBarColor({
          frontColor: that.data.event.font_color,
          backgroundColor: that.data.event.color,
        })
        wx.setBackgroundColor({
          backgroundColor: that.data.event.color,
          backgroundColorTop: that.data.event.color,
          backgroundColorBottom: that.data.event.color,
        })

        that.showCountdownTime(that.data.event)
      }
    })
  },
  showCountdownTime(event) {
    let eventTime = event.time

    let that = this
    this.setData({
      timer: setInterval(function () {
        that.setData({
          eventHasPassTime: dateUtil.eventHasPassTime(eventTime)
        })
      }, 1000)
    })

  },
  previewImage: function (event) {
    let src = event.currentTarget.dataset.src;//获取data-src
    let imgList = this.data.imgList
    if (imgList.length == 0) {
      imgList.push(src)
    }

    var that = this
    wx.previewImage({
      current: src,
      urls: imgList
    })
  },
  onShareAppMessage: function () {

  }

})