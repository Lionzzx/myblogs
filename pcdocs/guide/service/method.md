# 解决异步的几种方法

## 回调函数

```js
function f1(callback) {
  setTimeout(function() {
    console.log('1')
    callback()
  }, 1000)
}
function f2() {
  console.log('2')
}
f1(f2)
```

## Promise

```js
function getData1(arguments1) {
  return new Promise((resolve, reject) => {
    // 这里放你第一个请求的代码
    resolve(arguments1 + 1) //上面代码执行完了 调用resolve()
  })
}

function getData2(arguments2) {
  return new Promise((resolve, reject) => {
    //  这里放你第二个请求的代码
    resolve(arguments2 + 1) //上面代码执行完了 调用resolve()
  })
}

function getData3(arguments3) {
  return new Promise((resolve, reject) => {
    // 这里放你第三个请求的代码
    resolve(arguments3 + 1)
  })
}

// 第一种方式：链式结构处理回调
getData2(1)
  .then(res => {
    return getData2(res)
  })
  .then(res2 => {
    return getData3(res2)
  })
  .then(res3 => {
    console.log(res3)
  })
```
Promise虽然使得多个嵌套的异步调用能够通过链式的API进行操作，但是过多的then也增加了代码的冗余，也对阅读代码中各阶段的异步任务产生了一定干扰；

## async await
基本上，任何一个函数都可以成为async函数
```js
async function foo () {};
const foo = async function () {};
const foo = async () => {};
// 在async函数中可以使用await语句。await后一般是一个Promise对象。
async function foo () {
    console.log('开始');
    let res = await post(data);
    console.log(`post已完成，结果为：${res}`);
};
```