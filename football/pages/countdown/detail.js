const dateUtil = require('../../../utils/date.js')
const fontUtil = require('../../../utils/font.js')

Page({
  data: {
    db: null,
    isEmpty: false,
    timer: null,
    fcObj: {},
    event: null,
    imgList: [],
    eventHasPassTime: {}
  },
  onLoad: function (options) {
    this.setData({
      db: wx.cloud.database()
    })
    fontUtil.loadFontFace()

    let fc = options.fc
    this.getFootballClub(fc)
  },
  onUnload: function () {
    clearInterval(this.data.timer)
  },
  getFootballClub(fc) {
    var that = this
    wx.showLoading({ title: '读取数据…' })
    const coll = this.data.db.collection('fc-info')
    coll.where({
      fc: fc
    }).get().then(res => {

      if (res.data.length > 0) {
        that.setData({
          fcObj: res.data[0],
        })

        that.getEvent(fc)

        wx.setNavigationBarTitle({
          title: that.data.fcObj.name
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: that.data.fcObj.color,
        })
        wx.setBackgroundColor({
          backgroundColor: that.data.fcObj.color,
          backgroundColorTop: that.data.fcObj.color,
          backgroundColorBottom: that.data.fcObj.color,
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  getEvent(fc) {
    var that = this
    wx.showLoading({ title: '正在计算…' })
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

        that.showCountdownTime(that.data.event)
      } else {
        that.setData({
          isEmpty: true
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  showCountdownTime(event) {
    let eventTime = event.time
    let dealTime = (v) => {
      return ('00' + v).substr(-2)
    }

    let that = this
    this.setData({
      timer: setInterval(function () {
        let obj = dateUtil.eventHasPassTime(eventTime)
        that.setData({
          eventHasPassTime: {
            year: dealTime(obj.year),
            month: dealTime(obj.month),
            day: dealTime(obj.day),
            hour: dealTime(obj.hour),
            minutes: dealTime(obj.minutes),
            second: dealTime(obj.second),
          }
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
  back2List() {
    let fcListPage = '/football/pages/countdown/index'
    let pages = getCurrentPages();
    if(pages.length == 1) {
      wx.reLaunch({
        url: fcListPage
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let that = this
    return {
      title: '这里有一条关于' + that.data.fcObj.name + '的信息。去围观一下吧！',
    }
  }

})