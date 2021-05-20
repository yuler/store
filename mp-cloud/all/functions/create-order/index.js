const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// refs: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
// TODO: 
exports.main = async (event, context) => {

  console.log({ event, context }, cloud.DYNAMIC_CURRENT_ENV)

  const res = await cloud.cloudPay.unifiedOrder({
    functionName: 'payment-callback',
    envId: 'test-7grt94kx72509f46',
    subMchId: process.env.MERCH_ID,
    body: 'body 测试商品',
    outTradeNo: 'testTradeNo002',
    totalFee: 1,
    spbillCreateIp: '127.0.0.1',
  })
  return res
}
