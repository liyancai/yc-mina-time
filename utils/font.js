/**
 * 加载云存储中的字体资源
 */
let loadFontFace = () => {

  // 液晶字体
  wx.cloud.downloadFile({
    fileID: 'cloud://release-zm8us.7265-release-zm8us/YournameD7HomeHalf.ttf', // 云存储文件 ID
    // url: 'https://7265-release-zm8us-1259190818.tcb.qcloud.la/YournameD7HomeHalf.ttf?sign=d2f42e24e64cbbe9c0c9eda5c8852fec&t=1570713860',
    // filePath: filePath,
    success: res => {
      console.info(res)
      wx.loadFontFace({
        family: 'YournameD7HomeHalf', //font-family使用的名字
        source: 'url("' + res.tempFilePath + '")', //字体资源的地址
        // source: 'url("' + res.filePath + '")', //字体资源的地址
        success: console.log
      })
    },
    fail: console.error
  })
}

module.exports = {
  loadFontFace: loadFontFace,
}
