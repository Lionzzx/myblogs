# 异步请求

## 什么是 ajax

由于现在是前后端分离，那么数据间的交互就需要 javascript 脚本向服务器发起 HTTP 请求，ajax 成为脚本发起 HTTP 通信的代码词。
ajax 技术的核心是 XMLHttpRequest 对象(简称 XHR)。概括起来，就是一句话，ajax 通过原生的 XMLHttpRequest 对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。

## 请求步骤

`ajax包括以下几步骤：1、创建AJAX对象；2、发出HTTP请求；3、接收服务器传回的数据；4、更新网页数据`

```js
// 创建
xhr = new XMLHttpRequest()
// 发送请求,在使用XHR对象时，要调用的第一个方法是open()，如下所示，该方法接受3个参数
xhr.open('get', 'example.php', false)
// 如果是GET方法，send()方法无参数，或参数为null；如果是POST方法，send()方法的参数为要发送的数据
xhr.send(null)

//  接收响应

//responseText: 作为响应主体被返回的文本(文本形式)
//responseXML: 如果响应的内容类型是'text/xml'或'application/xml'，这个属性中将保存着响应数据的XML DOM文档(document形式)
//status: HTTP状态码(数字形式)
//statusText: HTTP状态说明(文本形式)
// 在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般来说，可以将HTTP状态码为200作为成功的标志。此时，responseText属性的内容已经就绪，而且在内容类型正确的情况下，responseXML也可以访问了。此外，状态码为304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本；当然，也意味着响应是有效的

// 如果需要接收的是异步响应，这就需要检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。
// 0(UNSENT):未初始化。尚未调用open()方法
// 1(OPENED):启动。已经调用open()方法，但尚未调用send()方法
// 2(HEADERS_RECEIVED):发送。己经调用send()方法，且接收到头信息
// 3(LOADING):接收。已经接收到部分响应主体信息
// 4(DONE):完成。已经接收到全部响应数据，而且已经可以在客户端使用了

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status == 200) {
      //实际操作
      result.innerHTML += xhr.responseText
    }
  }
}

// 超时
xhr.timeout = 1000
```

## axios 源码解析

axios 实际就是对 xhr 的封装。
核心代码如下

判断客户端还是服务器端

```js
function getDefaultAdapter() {
  var adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr')
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http')
  }
  return adapter
}
```

封装 xhr 对象

```js
function xhrAdapter(config) {
  var requestData = config.data
  var requestHeaders = config.headers
  if (utils.isFormData(requestData)) {
    delete requestHeaders['Content-Type'] // Let the browser set it
  }
  // 创建xhr对象
  var request = new XMLHttpRequest()
  // 打开链接
  request.open(
    config.method.toUpperCase(),
    buildURL(config.url, config.params, config.paramsSerializer),
    true
  )

  // Set the request timeout in MS
  request.timeout = config.timeout
  // 监听状态
  request.onreadystatechange = function handleLoad() {
    if (!request || (request.readyState !== 4 && !xDomain)) {
      return
    }

    // The request errored out and we didn't get a response, this will be
    // handled by onerror instead
    // With one exception: request that using file: protocol, most browsers
    // will return status as 0 even though it's a successful request
    if (
      request.status === 0 &&
      !(request.responseURL && request.responseURL.indexOf('file:') === 0)
    ) {
      return
    }

    // Prepare the response
    var responseHeaders =
      'getAllResponseHeaders' in request
        ? parseHeaders(request.getAllResponseHeaders())
        : null
    var responseData =
      !config.responseType || config.responseType === 'text'
        ? request.responseText
        : request.response
    var response = {
      data: responseData,
      status: request.status === 1223 ? 204 : request.status,
      statusText: request.status === 1223 ? 'No Content' : request.statusText,
      headers: responseHeaders,
      config: config,
      request: request
    }

    settle(resolve, reject, response)

    // Clean up request
    request = null
  }

  // Handle low level network errors
  request.onerror = function handleError() {
    // Real errors are hidden from us by the browser
    // onerror should only fire if it's a network error
    reject(createError('Network Error', config, null, request))

    // Clean up request
    request = null
  }

  // Handle timeout
  request.ontimeout = function handleTimeout() {
    reject(
      createError(
        'timeout of ' + config.timeout + 'ms exceeded',
        config,
        'ECONNABORTED',
        request
      )
    )

    // Clean up request
    request = null
  }

  // 发送请求
  request.send(requestData)
}
```

request 方法

```js
// 核心方法，添加原型方法
Axios.prototype.request = function request(config) {
  // 允许第一个参数是string 类型 axios('example/url'[, config])
  if (typeof config === 'string') {
    config = utils.merge(
      {
        url: arguments[0]
      },
      arguments[1]
    )
  }
  // 初始化config配置
  config = utils.merge(defaults, this.defaults, { method: 'get' }, config)
  config.method = config.method.toLowerCase()

  // 拦截器中间件
  var chain = [dispatchRequest, undefined]
  var promise = Promise.resolve(config)

  // 把拦截器插入到数组中 primise[] chain 。
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  // 设置一个数组，循环执行。promise.then().then().then()
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }

  return promise
}
```

拦截器对象，其实就是通过 use 把对应的处理方法放进`数组`中,并且放回长度。
eject 方法就把`数组`对应下标设置为 null。

```js
function InterceptorManager() {
  this.handlers = []
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  })
  return this.handlers.length - 1
}

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null
  }
}

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h)
    }
  })
}
```

允许各种请求方式 'delete', 'get', 'head', 'options','post', 'put', 'patch'

```js
// Provide aliases for supported request methods
utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(
        utils.merge(config || {}, {
          method: method,
          url: url
        })
      )
    }
  }
)

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      })
    )
  }
})
```

axios 上的方法实现

```js
axios.all = function all(promises) {
  return Promise.all(promises)
}
axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig))
}

function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig)
  var insta nce = bind(Axios.prototype.request, context)

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context)

  // Copy context to instance
  utils.extend(instance, context)

  return instance
}
```
