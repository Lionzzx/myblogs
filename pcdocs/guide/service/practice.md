# 自己实现封装一个请求函数库

## 用 es6 实现

```js
//api/http.js
export class BaseService {
  constructor(host, uriPrefix) {
    this.host = host
    this.uriPrefix = uriPrefix
  }
  // 处理url函数
  getUri(uri = '') {
    if (uri && uri.match(/^http/)) {
      return uri
    } else {
      if (this.uriPrefix) {
        return uri.indexOf('/') === 0
          ? this.host + this.uriPrefix + uri
          : this.host + this.uriPrefix + '/' + uri
      } else {
        return uri.indexOf('/') === 0 ? this.host + uri : this.host + '/' + uri
      }
    }
  }
  // 请求方法
  request(req) {
    return new Promise((resolve, reject) => {
      // 这里axios指的是封装的xhr对象，可以自己实现
      axios(req)
        .then(res => {
          const { statusCode } = res
          // 对状态码进行拦截
          if (statusCode >= 200 && statusCode <= 300) {
            return resolve(res)
          } else {
            return reject(res)
          }
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}
```

### 继承基础类，这里只书写了 post，get 两种方法

```js
//api/http.js
export class HttpService extends BaseService {
  constructor(uriPrefix) {
    super('', uriPrefix)
  }

  post(data = {}, config) {
    config.method = 'POST'
    const req = {
      url: this.getUri(config.url),
      method: 'POST',
      data
    }
    // 实现方法拦截
    return this.requestProxy({
      req,
      config
    })
  }

  get(params = {}, config) {
    config.method = 'GET'
    const req = {
      url: this.getUri(config.url),
      method: 'GET',
      params
    }
    // 实现方法拦截
    return this.requestProxy({
      req,
      config
    })
  }

  async requestProxy({ req = {}, config = {} }) {
    let res
    // 请求头处理
    // TODO 这里可以对config做处理
    req = delegate.requestHeaderHander({
      req,
      config
    })
    // 是否开启全局Loading
    let loading = config.loading
    try {
      loading && iView.Spin.show()
      res = await this.request(req)
    } catch (e) {
      res = e
    } finally {
      loading && iView.Spin.hide()
    }
    res = await delegate.responseHander(res, config)
    return res
  }
}
```

### 拦截器

```js
//api/interceptors.js
export default {
  // 状态码处理，决定是否走catch处理
  async errHandler(errcode, errmsg, config) {
    if (errcode == '40000') {
      if (config.method == 'POST') {
        // iView.Message.success(errmsg || '执行成功！')
      }
      return true
    } else {
      if (errcode == '50003') {
        //TODO removeToken();
      }
      return false
    }
  },

  requestHeaderHander({ req }) {
    req.header = Object.assign({}, req.header, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    })
    return req
  },

  async responseHander(res, config) {
    const { data } = res
    if (!res.data) {
      iView.Message.error('服务器异常！' + data)
      return Promise.reject(data)
    }
    if ('msgCode' in data) {
      const status = await this.errHandler(data.msgCode, data.msg, config)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    } else {
      const status = await this.errHandler(data.code || 0, data.error, config)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    }
  }
}
```

前端如何轻松的实现接口的定义，我暂时只能这么去实现，等我搞玩 JAVA 后，再自动化接口的定义，就不用自己看 eo 文档，自己定义 url,这部分教给后端去实现，已经传什么参数，结合 typescript 就可以优雅的解决。

写好 url 的配置

```
//对应后台的每个模块
{
  user: {
    getList: 'user/list'
  },
  socket: {
    auth: 'system/socket/wechat/company/auth'
  },
  marketingTemplate: {
    getDetail: 'system/marketing/template/detail',
    update: 'system/marketing/template/update',
    create: 'system/marketing/template/create',
    del: 'system/marketing/template/del',
    getList: 'system/marketing/template/list'
  }
}
```

然后写一个帮助函数

```js
// Service.js
import apiRoute from './config'
import { HttpService } from './http'

export class Service extends HttpService {
  constructor(module) {
    super('/api')
    if (!apiRoute[module]) {
      console.warn(`${module} is not found in apiRoute`)
    } else {
      for (let key in apiRoute[module]) {
        if (!apiRoute[module][key]) {
          return console.warn(`${key} is not a string `)
        }
        this[key] = async function(req, loading = false) {
          let config = { url: apiRoute[module][key], loading }
          return key.indexOf('get') == 0
            ? await this.get(req, config)
            : await this.post(req, config)
        }
      }
    }
  }
}
```
可以挂载在vue原型链上

```
//传入对应的模块名
vue.prototype.$socketApi = new Service('socket')

这样就可以直接调用了  this.$socketApi.[方法名]();
```