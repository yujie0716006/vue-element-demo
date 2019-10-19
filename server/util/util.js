// 短信发送接口
const moment = require('moment')
const Base64 = require('js-base64').Base64
const request = require('request')
const md5 = require('md5')

/*
* 生成指定长度的随机数
* 这是用来模拟用户请求验证码的时候，第三方软件发送给用户的 验证码
* */
const randomCode = (length) => {
  const chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  let result = ''
  for (let i = 0; i < length; i++) {
     const index = Math.ceil(Math.random() * 9)
    result += chars[index]
  }
  return result
}

/*
* 向指定号码发送指定验证码*/
const sendCode = (phone, code, callback) => {
  const baseObj = {
    baseUrl: 'https://app.cloopen.com:8883',
    accountSid: '8aaf07085e995a83015e9cb390d4016f',
    authToken: 'f95d9df3127941668ad4cfd0b839f774', // 账户授权令牌
    appId: '8aaf07085e995a83015e9cb392910175'
  }
  /*统一的请求包头 URL格式：/2013-12-26/Accounts/{accountSid}/SMS/TemplateSMS?sig={SigParameter}
选
SigParameter: REST API 验证参数，生成规则如下
1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG*/
  const time = moment().format('yyyyMMddHHmmss')
  const sigParameter = md5(baseObj.appId + baseObj.authToken + time)
  const url = `${baseObj.baseUrl}/2013-12-26/Accounts/${baseObj.accountSid}/SMS/TemplateSMS?sig=${sigParameter}`

  /*准备发送的请求体*/
  const body = {
    to: phone,
    appId: baseObj.appId,
    templateId: '1',
    datas: [code, "1"]
  }
  /*
* 准备请求头， http标准包头字段*/
  const authorization = `${Base64(baseObj.appId)}:${time}`
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body) + '',  // 表示的是：这个请求体的长度是多少
    'Authorization': authorization
  }

  /*
  * 发动请求，并得倒返回的结果，调用callback*/
  request({
    url: url,
    method: 'POST',
    headers: headers,
    body: body,
    json: true,
  }, (error, response, body) => {
    console.log('err, response', error, response, body)
    callback(body.statusCode === '000000')
  })

}



// 向外暴露这个生成随机数的函数
exports.randomCode = randomCode
// 向外暴露发送短息的函数
exports.sendCode = sendCode
