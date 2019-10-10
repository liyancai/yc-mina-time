/**
 * 加载云存储中的字体资源
 */
let loadFontFace = () => {

  // 液晶字体
  wx.cloud.downloadFile({
    fileID: 'cloud://release-zm8us.7265-release-zm8us/YournameD7HomeHalf.ttf', // 云存储文件 ID
    success: res => {
      wx.loadFontFace({
        family: 'YournameD7HomeHalf', //font-family使用的名字
        source: 'url("' + res.tempFilePath + '")', //字体资源的地址
        success: console.log
      })
    },
    fail: console.error
  })
}

module.exports = {
  loadFontFace: loadFontFace,
}
