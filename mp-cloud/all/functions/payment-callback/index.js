// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {

  // "event": {
  //   "appid": "wxd2d16a504f24665e",
  //   "bankType": "OTHERS",
  //   "cashFee": 1,
  //   "feeType": "CNY",
  //   "isSubscribe": "N",
  //   "mchId": "1800008281",
  //   "nonceStr": "0cdd8280e65d33f7",
  //   "openid": "oPoo442ImlBUWpV9X58zKWHeU_w0",
  //   "outTradeNo": "testTradeNo001",
  //   "resultCode": "SUCCESS",
  //   "returnCode": "SUCCESS",
  //   "subAppid": "wx43d4fbc340a982bd",
  //   "subIsSubscribe": "N",
  //   "subMchId": "1609673695",
  //   "subOpenid": "o9qkx5IuB5qx0edOJjT03FWLVqHw",
  //   "timeEnd": "20210520211626",
  //   "totalFee": 1,
  //   "tradeType": "JSAPI",
  //   "transactionId": "4200001019202105203238662946",
  //   "userInfo": {
  //     "appId": "wx43d4fbc340a982bd",
  //     "openId": "o9qkx5IuB5qx0edOJjT03FWLVqHw"
  //   }
  // }

  console.log({ event, context })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}