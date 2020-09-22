/*实现最基本的MVVM框架的原理*/
/*实现的几个基本功能：input、{{}}、v-html、v-on:click事件*/

// dep存放watcher观察者，当数据变化的时候，dep通知调取watcher
class Dep{
  constructor() {
    this.subs = [] /// 存放所有watcher观察者
  }
//  订阅
  addSub(watcher) { // 添加观察者watcher
    this.subs.push(watcher)
  }
//  发布
  notify() {
  //  当数据改变的时候，循环dep中所有的watcher，然后调用watcher中的update改变数据
    this.subs.forEach(watcher => watcher.update())
  }
}

// 观察者 （发布订阅）
// 我们在使用观察者watch的语法 vm.$watch(vm, 'school.name', (newVal) => {})
class Watcher{
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
  //  默认先存放之前的旧值
    this.oldValue = this.get()
  }
//  获取当前这个属性的值
  get() {
    // 当new Watcher会创建一个实例，并将自己的this放在上面（存储一个观察者）
    Dep.target = this
    // 取值的时候，把这个观察者和数据关联起来
    let value = CompileUtil.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }
//  更新操作，数据变化后，会调用观察者的update方法,获取新的值
  update() {
    let newVal = CompileUtil.getVal(this.vm, this.expr)
    if (this.oldValue !== newVal) {
      this.cb(newVal)
    }
  }
}

// 实现数据的数据劫持
class Observer{
  constructor(data) {
    this.observer(data)
  }
//  将数据转化成Object.defineProperty的形式
  observer(data) {
  // 如果是对象了，才进行观察
    if (data && typeof data === 'object') {
    //  数据是对象
      for (let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }
//  转成Object.defineProperty
  defineReactive(obj, key, value) {
    // value是data中一个属性的值，但是这个可能是多层嵌套的对象关系，所以再次调用观察函数判断
    // 如果这个属性的值是多层对象嵌套,则每一层级都有get和set属性了
    this.observer(value)
    // 在给每一个data数据转化数据的同时，给每一个属性，都添加一个具有发布订阅的功能
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        // 当创建watcher时，会使用getVal获取属性值，则会调用此函数的get方法。会取到对应的内容，并且把watcher方法了全局上
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newVal) => {
        if (value !== newVal) {
          // 如果新赋的值是一个对象，那么必须将这个新对象也转变成新的数据形式
          this.observer(newVal)
          value = newVal
          dep.notify()
        }
      }
    })
  }
}

// 编译模版类
class Compiler {
  constructor(el, vm) {
    //  判断el属性，是不是一个元素，如果不是元素，则获取这个元素
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
  //  将当前节点中的元素，获取到并放到内存中（保存在一个变量里面就表示存放在内存中）
    let fragment = this.node2fragment(this.el)
  //  把节点中的内容进行替换

  //  编译模版，用数据编译
    this.compile(fragment)
  //  把编译后的内容，塞到页面中
    this.el.appendChild(fragment)
  }
  // 判断属性是否为指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 编译元素节点的,带有指令的
  compileElement(node) {
    let attributes = node.attributes ;
    [...attributes].forEach(attr => { // type='text' v-model='school.name'
      let {name, value:expr} = attr
    //  判断是不是vue的指令元素节点
      if (this.isDirective(name)) { // v-model v-html v-on:click
        let [,directive] = name.split('-') // model on:click
        let [directiveName, eventName] = directive.split(':') // 没有:的，不分割，就只是转换成数组形式
      //  指令的不同，需要调用不同的指令来处理
        CompileUtil[directiveName](node, expr, this.vm, eventName)
      }
    })
  }
  // 编译文本节点的
  // 判断当前文本节点中内容是否包含 {{xx}} {{aa}}
  compileText(node) {
    let content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      // 文本节点
      CompileUtil['text'](node, content, this.vm)
    }
  }
  // 核心的编译方法，用来编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes; // 类数组，没有length属性
    [...childNodes].forEach(child => {
    //  判断元素节点还是文本节点，不同的处理方法
      if (this.isElementNode(child)) {
        this.compileElement(child)
      //  如果是元素节点的话，需要把自己再传递进去，遍历他自己，找这个元素节点下面的子节点
        this.compile(child)
      } else {
        this.compileText(child)
      }
    })
  }

  // 是否是元素节点。当nodeType=1时，表示元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

//  将节点移动到内存中
  node2fragment(node) {
  //  创建一个文档碎片
    let fragment = document.createDocumentFragment()
    let firstChild
    while((firstChild = node.firstChild)) {
      // appendChild具有移动性（一直只有一个元素节点）
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

// 编译工具。调用不同指令的对象
const CompileUtil = {
  // 根据表达式获取对应的数据
  getVal(vm, expr) { // vm.$data
    //  数据可能存在多层嵌套的关系，这样就能找到每一级 expr = school.name => [school, name]
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  // 更具表达式设置对应的数据新的属性值
  setValue(vm, expr, value) {
     expr.split('.').reduce((data, current,index, arr) => {
      // 当遍历到最后一层对象时，再赋值
      if (index === arr.length - 1) {
        return data[current] = value
      }
      return data[current]
    }, vm.$data)
  },
  model(node, expr, vm) { // node：节点 expr：表达式 vm：当前实例
    //  给输入框赋予value属性 node.value = xxx
    let fn = this.updater['modelUpdater']
    // 给输入框添加一个观察者，之后数据更新了会触发这个方法，会拿新值给输入框赋值
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })
    // 给输入框中添加一个input事件，表示当向输入框中输入内容时，也更改视图
    node.addEventListener('input', (e) => {
      let value = e.target.value // 获取用户的输入内容
    //  并将用户输入的内容更新到页面上
      this.setValue(vm, expr, value)
    })
    let value = this.getVal(vm, expr)
    fn(node, value)
  },
  html(node, expr, vm) {
    let fn = this.updater['htmlUpdater']
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })
    let value = this.getVal(vm, expr)
    fn(node, value)
  },
  getContentValue(vm, expr) {
  //  遍历表达式，将内容，重新替换成一个完成的内容，返回回去（返回的是每个值）
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  // on事件
  on(node, expr, vm, eventName) { // v-on:click='change'  expr:change
    node.addEventListener(eventName, (e) => {
      // vm[expr](e) 这样调用是一般调用this的指向为window.但是我们要使用的this的指向应该是vm这个实例
      vm[expr].call(vm, e)
    })
  },
  text(node, expr, vm) {
    let fn = this.updater['textUpdater']
    // replace的用法是，通过你写的逻辑更改符合项，最终返回的是修改后的内容拼接（这里是符合条件的全的字符串）
    const content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => { // args: ['{{school.name}}', 'school.name', 3]
      // 循环遍历给每一个表达式{{}}添加一个观察者
      new Watcher(vm, args[1], () => {
        fn(node, this.getContentValue(vm, expr)) // 返回一个全的字符串
      })
      return this.getVal(vm, args[1])
    })
    fn(node, content)
  },
  updater: { // 把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    // 处理文本节点
    textUpdater(node, value) {
      node.textContent = value
    }
  }
}

// 基类 vue的基本调度, 写一个vue的类
export default class Vue {
  // options:为调用Vue构造函数时传递的配置对象
  constructor(options) {
    //  配置对象中定义的作用域区间$el、数据$data，计算属性computed以及函数method
    this.$el = options.el
    this.$data = options.data
    const computed = options.computed
    const methods = options.methods
    //  如果有根元素的存在，则编译模版
    if (this.$el) {
      // 实现数据劫持，就是将所有data中的数据，全部转换成用Object.defineProperty来定义，成为数据劫持
      new Observer(this.$data)
    //  使用computed，就是拿到他的属性，然后赋值到this.$data上面
      for (let key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
          //  在读取这个值的时候，直接调用。这里要绑定this.如果使用this.computed[key]()调用的时候，this的指定是不对的，所以我们要使用call改变this的指向
            return computed[key].call(this)
          }
        })
      }
      // 将methods方法添加到this这个实例上面，this指向为vm
      for (let key in methods) {
        Object.defineProperty(this, key, {
          get: () => {
            //  在读取这个值的时候，直接调用。这里要绑定this.如果使用this.computed[key]()调用的时候，this的指定是不对的，所以我们要使用call改变this的指向
            return methods[key]
          }
        })
      }
      // 我们将数据获取操作，在vm上的取值操作，代理到vm.$data。 就是使用vm.school其实是在vm.$data.school上取值
      this.proxyVm(this.$data)
      // 模版编译，这个 要放在最后，因为要先准备好数据，最后在进行模版编译。如果不是放在最后，有可能会报错
      new Compiler(this.$el, this)
    }
  }
  proxyVm(data) {
    for (let key in data) {
      // 将$data上面的数据都赋值到this本身这个实例上面，使用vm.school操作
      Object.defineProperty(this, key, {
        get() {
        //  每次取值的使用，都是在$data上取
          return data[key]
        },
      //  当我们更改数据的时候，应该将新赋值的数据在data上面修改了
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}
