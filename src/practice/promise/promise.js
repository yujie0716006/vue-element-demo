/*自定义Promise函数模块：IIFE*/
(function(window) {
  // Promise的构造函数，excutor：执行器函数（同步执行）
  function Promise(excutor) {
    // 因为像resolve和reject函数，在使用的时候是直接调用的。所以它里面的self的指向是window，我们想要self的指向都是promise
    const self = this
    self.status = 'pending' // 给promise对象指定的status属性，初始值为pending
    self.data = undefined // 给promise对象指定一个用于存储数据的属性
    self.callbacks = [] // 回调函数的数据，每个元素的结构为{onResolved(){}, onRejected(){}}

    function resolve(value) {
      // 状态只能更改一次，只能由pending变为resolved或是rejected，所以当状态不是pending的话，表示已经更改过了不能在更改了就直接return
      if (self.status !== 'pending') return
      self.data = value
      self.status = 'resolved'
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
      if (self.status !== 'pending') return
      self.status = 'rejected'
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
  Promise.prototype.then = function (onResolved, onRejected) {
  //  假设状态还是pending状态，回调函数要先保存起来不执行
    this.callbacks.push({
      onResolved,
      onRejected
    })
  }

//  用来指定失败回调函数的方法
  Promise.prototype.catch = function(onRejected) {

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
