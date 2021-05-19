// 云函数入口文件
import cloud from 'wx-server-sdk';

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// refs: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
// TODO: 
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "小秋TIT店-超市",
    "outTradeNo" : "1217752501201407033233368018",
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1900009231",
    "totalFee" : 1,
    "envId": "test-f0b102",
    "functionName": "pay_cb"
  })
  return res
}
