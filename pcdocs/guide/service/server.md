# 和服务端进行交互

## 前端请求流程

在 `该项目` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 api service 请求函数；
3.  使用封装的 request.js 发送请求；
4.  获取服务端返回；
5.  更新 data；

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 `@/src/api` 文件夹中，并且一般按照 model 纬度进行拆分文件，如：

```
api/
  logManagement.js
  systemManage.js
  resource.js
  ...
```

## request.js

其中，`@/src/utils/request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

```js
const service = axios.create({
  baseURL: '/api', //baseURL设置
  timeout: 5000 //设置超时时间
})
//发送前拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//请求后拦截
service.interceptors.response.use(
  response => {
    if (response.data.msgCode == '50000') {
      // 错误处理
    } else if (response.data.msgCode == '50003' && Cookies.get('user') != '') {
      // 错误处理
    }
    if (response.data.msgCode == '60000') {
      iView.Message.warning('对不起，您没有权限访问该页面！')
    }
    return response.data.data
  },
  error => {
    // 错误处理
    return Promise.reject(error)
  }
)
```

## 一个请求文章列表页的例子：

```js
// api/logManagement.js
import request from '@U/request'
export function marketingDel(data) {
  return request({
    url: '/system/marketing/template/del',
    method: 'post',
    data
  })
}
//views/logManagement/index.vue
import { marketingDel } from '@A/logManagement'
async deleteTemplate({ row: { id = '' } }) {
    await marketingDel({ id });
}
```

## 设置多个 baseURL

我们可以通过[环境变量](/zh/guide/essentials/deploy.html#环境变量)设置多个`baseURL`，从而请求不同的 api 地址。

```bash
# build.js
process.env.BASE_API = '/dev-api'
process.env.BASE_API2 = '/dev-api2'
```

之后根据环境变量创建`axios`实例，让它具有不同的`baseURL`。 [@/utils/request.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js)

```js
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

const service2 = axios.create({
  baseURL: process.env.BASE_API2, // api 的 base_url
  timeout: 5000 // request timeout
})
```

或者

```js
export function marketingDel(data) {
  return request({
    url: '/system/marketing/template/del',
    method: 'post',
    data,
    baseURL: 'xxxx' // 直接通过覆盖的方式
  })
}
```
