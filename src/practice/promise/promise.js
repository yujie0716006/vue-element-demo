/*自定义Promise函数模块：IIFE*/
(function(window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  // Promise的构造函数，excutor：执行器函数（同步执行）
  function Promise(excutor) {
    // 因为像resolve和reject函数，在使用的时候是直接调用的。所以它里面的this的指向是window，我们想要this的指向都是promise
    const self = this
    self.status = PENDING // 给promise对象指定的status属性，初始值为pending
    self.data = undefined // 给promise对象指定一个用于存储数据的属性
    self.callbacks = [] // 回调函数的数据，每个元素的结构为{onResolved(){}, onRejected(){}}

    function resolve(value) {
      // 状态只能更改一次，只能由pending变为resolved或是rejected，所以当状态不是pending的话，表示已经更改过了不能在更改了就直接return
      if (self.status !== PENDING) return
      self.data = value
      self.status = RESOLVED
    //  如果之前有待执行的callback函数，要立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        // setTimeout模拟异步任务，异步任务将其放入队列中执行所有成功的回调
        setTimeout(() => {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onResolved(value)
          })
        })
      }
    }
    function reject(reason) {
      if (self.status !== PENDING) return
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onRejected(reason)
          })
        })
      }
    }
    // 当在使用promise的时候，可能会出现抛异常错误，所以这里面要进行判断
    try{
      //  立即同步执行excutor
      excutor(resolve, reject)
    }
    catch(error) { // 当执行器抛出异常时，promise对象变为rejeced状态，调用reject函数
      reject(error)
    }
  }

//  Promise原型对象的then方法，指定成功和失败的回调函数，返回一个新的promise对象
  /*用来指定成功/失败的回调函数方法？
  1. 如果当前promise是resoled,异步执行成功的回调函数onResolved
  2. 如果当前promise是rejected,异步执行失败的回调函数onRejected
  2. 如果当前promise是pending，则保存回调函数
  返回一个新的promise对象，他的结果状态由onResolved和onRejected回调函数的执行结果决定
  1. 抛出异常，状态变成rejected失败，结果值为error
  2. 返回值不是promise，状态变为resolved成功，结果值为这个返回值
  3. 返回值是promise,由这个promise的结果决定新promise的结果（成功/失败）
  * */
  Promise.prototype.then = function (onResolved, onRejected) {
    // 我们在使用then的时候，可能只写一个函数，所以要设置回调函数的默认值
    // 设置回调函数的默认值（必须是函数）
    onResolved = typeof onResolved === 'function' ? onResolved : value => value // value向下继续传递
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 抛出错误，reason向下传递
    // then函数的直接结果为返回一个新的promise
    return new Promise((resolved, rejected) => {
      const self = this
      // 因为成功/失败的处理方式是一样的，只是在调用状态上面的函数不用而已onResolved/onRejected
      function handle(callback) {
        //  返回一个新的promise结果由onResolved或onRejected执行结果决定，分为3种情况
        try{
          const result = callback(self.data) // 回调函数的执行结果
          //  判断onResolved/onRejected的返回结果result是否是promise
          if (result instanceof Promise) { // 3.返回的结果为promise
            //  返回值是promise，由这个promise的结果决定新的promise。通过这个promise的then拿到他返回结果
            result.then(
              value => resolved(value),
              reason => rejected(reason)
            )
            //  也可以将上面的简写，上面的是写一个函数然后再函数里面调用，下面的简写是直接在使用的时候就调用
            //   result.then(resolved, rejected)
          } else { // 2.返回值不是promise，直接将这个返回值返回
            resolved(result)
          }
        } catch(error) { // 1.抛出异常，状态变rejected失败，结果为error
          rejected(error)
        }
      }
      // 当前promise的状态为resolved成功
      if (this.status === RESOLVED) {
        //  状态为resolved，立即异步执行成功的回调函数onResolved
        setTimeout(() => {
          handle(onResolved)
        })
      } else if (this.status === REJECTED) { // 当前promise的状态为rejected失败
        setTimeout(() => {
          handle(onRejected)
        })
      } else { // 当前promise的状态为pending
      //  pending表示状态还没有改变，将成功/失败的回调函数先在callbacks容器中缓存起来
      //  缓存中的回调函数也得判断返回值是否是promise的情况
        this.callbacks.push({
          onResolved() {handle(onResolved)},
          onRejected() {handle(onRejected)}
        })
      }
    })
  }

//  用来指定失败回调函数的方法
  Promise.prototype.catch = function(onRejected) {
  // catch是then的语法糖,这个this是Promise所以可以直接使用this.then能够获取到
    return this.then(undefined, onRejected)
  }
//  用来返回一个指定value的成功的promise;value可能是一个一般值，也可能是一个promise对象
  Promise.resolve = function (value) {

  }
//  用来指定一个返回reason的失败的promise
  Promise.reject = function (reason) {

  }
//  返回一个promise对象，只有当数组中所有promise都成功才成功，否则失败
  Promise.all = function (promises) {

  }
//  返回一个promise，由第一个完成promise决定
  Promise.race = function (promises) {

  }
//  向外暴露promise（相当于在window上添加promise属性）
  window.Promise = Promise
})(window)
