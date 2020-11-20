# Vue3.0[Beta]要点与源码解读



![img](https://upload-images.jianshu.io/upload_images/10868449-7a6763b0e6afdb6e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

主播你懂vue吗？讲的啥啊，一句也听不懂...

咳咳，进入正题。



![img](https://upload-images.jianshu.io/upload_images/10868449-734955bf94026711.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

源码知识图谱

### Vue3新增了

- **Performance**：性能更强，比Vue 2.0快了接近2倍。
- **Tree shaking support**：可以将无用模块“剪辑”，仅打包需要的，按需编译代码。
- **Composition API**：组合式API，类似hooks，composition API 可以实现更灵活且无副作用的复用代码，`mixin`将不再作为推荐使用。
- **Fragment, Teleport, Suspense**：“碎片”，Teleport即Protal传送门，“悬念”
- **Better TypeScript support**：更优秀的Ts支持
- **Custom Renderer API**：暴露了自定义渲染API

这里不得不提到vue3**重写了响应式原理**：

在 Vue 2中， Vue 通过 `Object.defineProperty` 转化对象属性`getters/setters` 的方法来实现响应式，对于数组来说额外对常用的数组方法进行来拦截才能截获到数组元素的变动，但这确实也造成了一些问题，比如无法感知直接通过索引来更新数组的场景。
**reactive**:
在 Vue 3 中，用 ES6 的 `Proxy`重写了响应式的实现，并将其功能 API 直接暴露给开发者，换言之，开发者甚至可以将 Vue 的响应式作为一个独立的库来使用。



![img](https://upload-images.jianshu.io/upload_images/10868449-9170c17e7fbecf31.png?imageMogr2/auto-orient/strip|imageView2/2/w/1091/format/webp)

Vue3核心

### 一、Composition API

官方文档：[https://composition-api.vuejs.org/zh/](https://links.jianshu.com/go?to=https%3A%2F%2Fcomposition-api.vuejs.org%2Fzh%2F)
随着功能的增长，复杂组件的代码变得越来越难以维护。 尤其发生你去新接手别人的代码时。 根本原因是 Vue 2 通过**option API**组织代码，但是在大部分情况下，通过逻辑考虑来组织代码更有意义。
在Vue2下相关业务的代码需要遵循option的配置写到特定的区域，导致后续维护非常的复杂，同时代码可复用性不高，而Vue3的**Composition API**就是为了解决这个问题而生的。而且可与现有的 Options API一起使用。

##### 1、组合式的6个主要API：

- **reactive**（Composition API的核心）
  接收一个普通对象然后返回该普通对象的**响应式**代理。等同于 Vue2 的 `Vue.observable()`。
  响应式转换是“深层的”：会影响对象内部所有嵌套的属性。基于 ES6的 `Proxy` 实现，返回的代理对象不等于原始对象。建议仅使用代理对象而避免依赖原始对象。
- **ref**
  接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 `.value`。如果传入 ref 的是一个对象，将调用 reactive 方法进行深层响应转换
- **computed**
  传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。
  或者传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态
- **readonly**
  传入一个对象（响应式或普通）或 ref，返回一个原始对象的只读代理。一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。

```objectivec
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 依赖追踪
  console.log(copy.count)
})

// original 上的修改会触发 copy 上的侦听
original.count++

// 无法修改 copy 并会被警告
copy.count++ // warning!
```

- **wathEffect**
  立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。
  当 watchEffect 在组件的 `setup()` 函数或生命周期钩子被调用时， 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

```jsx
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 打印出 0

setTimeout(() => {
  count.value++
  // -> 打印出 1
}, 100)
```

- **watch**
  和vue2的watch一样

##### 2、生命周期钩子函数



![img](https://upload-images.jianshu.io/upload_images/10868449-323dafb63005db3b.png?imageMogr2/auto-orient/strip|imageView2/2/w/810/format/webp)

Vue3的生命周期钩子函数变化

###### （1）setup函数

`setup` 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。

- 调用时机：
  创建组件实例，然后初始化 props ，紧接着就调用setup 函数。从生命周期钩子的视角来看，它会在 beforeCreate 钩子之前被调用。
- 参数

```cpp
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.emit
  },
}
```

**props 作为其第一个参数** (注：props 对象是响应式的，watchEffect 或 watch 会观察和响应 props 的更新。不要解构 props 对象，那样会使其失去响应性）。

**第二个参数提供了一个上下文对象context**，`attrs`和 `slots` 都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值，所以可以解构，无需担心后面访问到过期的值。

- 特别注意this的用法
  **this 在 setup() 中不可用！**
  由于 setup() 在解析 vue2 选项前被调用，setup() 中的 this 将与 vue2选项中的 this 完全不同。同时在 setup() 和 vue2 选项中使用 this 时将造成混乱。

```jsx
setup() {
  function onClick() {
    this // 这里 `this` 与你期望的不一样！
  }
}
```

### 二、简易代码展示Vue3核心：

```xml
<script src="../dist/vue.global.js"></script>
<script>
  Vue2的options api 很难做tree-shaking
  // export default {
  //   data() {
  //     return {}
  //   }，
  //   methods: {

  //   },
  //   computed: {
        
  //   }
  // }
 

  // createApp代替new Vue()
  const {createApp, reactive, watchEffect, computed } = Vue
  // 按需引入，tree-shaking生效
  // 就算你引入了computed ，如果没有用到它，打包时就会把这段代码删掉。
  const App = {
    // template => render function（返回vdom） 
    // compile-dom和compile-core做的
    template: `
      <button @click="onclick">
          {{state.count}} -- {{state.double}}
      </button>
    `,
    setup() {
      // 响应式，用Proxy取代object.defineProperty
      const state = reactive({
        count: 0,
        double: computed(()=> state.count*2)
      })
      watchEffect(()=> {
        console.log('数据变了哦：', state.count)
      })
      function onclick() {
        state.count += 1
      }
      return {
        state,
        onclick
      }
    }

  }
  createApp(App).mount('#app')
</script>
```



![img](https://upload-images.jianshu.io/upload_images/10868449-8a827639230fb933.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

手写代码展示vue3整个源码流程

### 三、reactive源码学习与响应式实现

划重点！！！

```jsx
// 作为缓存
// WeakMap:
// (1)Map对象的键可以是任何类型，但WeakMap对象中的键只能是对象引用
// (2)WeakMap不能包含无引用的对象，否则会被自动清除出集合（垃圾回收机制）。
// (3)WeakSet对象是不可枚举的，无法获取大小。
// 原始对象=> 响应式对象
let toProxy = new WeakMap()
// 响应式对象=> 原始对象
let toRaw = new WeakMap()

let effectStack = [] //存储effect的地方
let targetMap = new WeakMap() // 特殊的对象 key是object
// obj.name
// {
//   target: deps :{ key:[ dep1,dep2] }
// }
// 以上 存储依赖关系

// 目的：收集依赖
function track(target, key) {
  // 最后一个 就是最新的
  const effect = effectStack[effectStack.length - 1]
  // 最新的effect
  if (effect) {
    let depMap = targetMap.get(target)
    if (depMap === undefined) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }
    let dep = depMap.get(key) // obj.count  target是obj，key是count
    if (dep == undefined) {
      dep = new Set()
      depMap.set(key, dep)
    }
    // 双向存储无处不在，优化的原则
    if (!dep.has(effect)) {
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}
// 目的：触发更新
function trigger(target, key, info) {
  // 寻找依赖effect
  const depMap = targetMap.get(target)
  if (depMap === undefined) {
    // 没有依赖
    return
  }
  const effects = new Set()
  const computedRunners = new Set()

  if (key) {
    let deps = depMap.get(key)
    // deps里面全部是effect
    deps.forEach((effect) => {
      // effect()
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }
  effects.forEach((effect) => effect())
  computedRunners.forEach((computed) => computed())
}

function effect(fn, options = {}) {
  // 其实就是往effectStackpush了一个effect函数，执行fn
  // @todo 处理options
  let e = createReactiveEffect(fn, options)

  if (!options.lazy) {
    e()
  }

  return e
}

function createReactiveEffect(fn, options) {
  // 构造effect
  const effect = function effect(...args) {
    return run(effect, fn, args)
  }
  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy
  return effect
}

function run(effect, fn, args) {
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect)
      return fn(...args) // 执行 执行的时候，是要获取的
    } finally {
      effectStack.pop() // effect用完就要推出去
    }
  }
}

function computed(fn) {
  // computed就是一个特殊的effect
  const runner = effect(fn, {
    computed: true,
    lazy: true
  })
  return {
    effect: runner,
    get value() {
      return runner()
    }
  }
}
// 举例：
// let obj = {name:'kkb'}   背后有一个proxy监听 响应式
// obj.name  触发get函数
// 响应式代理（重点）
const baseHandler = {
  get(target, key) {
    // target就是obj，key就是name
    // 收集依赖 track
    // @todo
    // 大部分情况可以直接return target[key]
    const res = Reflect.get(target, key) // es6新api Reflect，和proxy搭配使用
    // 查找并返回target对象的property属性
    track(target, key)
    // 递归，如果有嵌套对象接着reactive
    return typeof res == 'object' ? reactive(res) : res
  },
  set(target, key, val) {
    const info = {
      oldValue: target[key],
      newValue: val
    }
    // obj.name = xx 这里 我们是需要通知更新的
    const res = Reflect.set(target, key, val)
    // 触发更新
    // @todo
    trigger(target, key, info)
    return res
  }
}
// 响应式
function reactive(target) {
  // 查询缓存
  let observed = toProxy.get(target)
  if (observed) {
    return observed
  }
  if (toRaw.get(target)) {
    return target
  }
  // 响应式核心！！！！！！
  observed = new Proxy(target, baseHandler)
  // 监听完后，设置缓存
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  // 这两步实现了双向搜索地图
  return observed
}
```

**reactive流程图：**



![img](https://upload-images.jianshu.io/upload_images/10868449-ca873ac0b0d87cf5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1039/format/webp)



### 四、compiler编译原理与Vdom

嫌麻烦可在线对比编译结果：
Vue2.6：[https://template-explorer.vuejs.org/](https://links.jianshu.com/go?to=https%3A%2F%2Ftemplate-explorer.vuejs.org%2F)

Vue3：[https://vue-next-template-explorer.netlify.app/](https://links.jianshu.com/go?to=https%3A%2F%2Fvue-next-template-explorer.netlify.app%2F)

template => Vdom过程：

> template 解析过程
>
> 1. 解析成抽象语法树 AST
> 2. 根据AST，用transform模板转化
>    @click.prevent.capture
> 3. codeGen生成代码字符串string
> 4. 使用new Function（） （es6新建函数） 把string 转换成可执行的函数
> 5. 这个函数执行后返回的才是Vdom
>
> 这5部是Vdom的逻辑，无论vue还是react都是这个逻辑

流程图



![img](https://upload-images.jianshu.io/upload_images/10868449-2c3660e9fecf0e1b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1016/format/webp)

compiler编译涉及非常多的正则，这里不做详细展示。。。略过~

##### vue为啥需要vdom？

compile模块 vue处理成vdom
js描述dom，这个就是vdom
**有了compiler 跨端才成了可能：**

```bash
json：
{
  type:'div',
  props:{id:app},
  children:[ name, 
  {type:div } ]
}
有了compiler 跨端才成了可能。
<div><input></div> 这些标签，只有浏览器耗时

这个对象，或者json，跨平台的 使用不同平台的render
结构化的对象 很好解析 别的平台， 只需要记录好映射关系就可以。
```

**（Vdom）虚拟dom优点：**

虚拟dom轻量快速，最小dom操作，提升性能和用户体验
跨平台：将虚拟dom和吗好想转换为不同运行时特殊操作实现跨平台
兼容性：还可以加入兼容性代码增强操作的兼容性

- 缓存的意义：innerHTML 内置vdom
- 树形结构
- 编译时优化，足够多的标记

```jsx
return function render(_ctx, _cache) {
  with (_ctx) {
    const {
      toDisplayString: _toDisplayString,
      createVNode: _createVNode,
      openBlock: _openBlock,
      createBlock: _createBlock
    } = _Vue

    return (
      _openBlock(),
      _createBlock('div', null, [
        _createVNode(
          'p',
          {
            id: xx
          },
          _toDisplayString(name),
          9 /* TEXT, PROPS */,
          ['id']
        ),
        _createVNode('h2', null, '大家听我扯淡'), // 静态 永远不会变 不用做diff 不用考虑更新
        _createVNode('h2', null, '大家听我扯淡123')
      ])
    )
  }
}
<script>
  // 创建虚拟DOM
  function createElement(type, props, children) {
    return {
      type,
      props,
      children
    }
  }

  function render(dom) {
    let el = document.createElement(dom.type)
    for (let key in dom.props) {
      el.setAttribute(key, dom.props[key])
    }
    dom.children.forEach(child => {
      child = (typeof child == 'object') ? render(child) : document.createTextNode(child)
      el.appendChild(child)
    })
    return el
  }

  // let vdom = <ul> </ul>
  let vdom = createElement('ul', {
    class: 'list'
  }, [
    createElement('li', {
      class: 'item'
    }, ['item1']),
    createElement('li', {
      class: 'item'
    }, ['item2']),
    createElement('li', {
      class: 'item'
    }, ['item3'])
  ])
  var el = render(vdom)
  document.body.appendChild(el)
</script>
```

### 五、runtime

#### 1、runtime-core

与平台无关的运行时，专门用于自定义的render。其实现的功能有虚拟 DOM 渲染器、Vue 组件和 Vue 的各种API，我们可以利用这个 runtime 实现针对某个具体平台的高阶 runtime，比如自定义渲染器。



![img](https://upload-images.jianshu.io/upload_images/10868449-199802e3916b55a1.png?imageMogr2/auto-orient/strip|imageView2/2/w/640/format/webp)

#### 2、 runtime-dom

针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。主要功能是适配了浏览器环境下节点和节点属性的增删改查。它暴露了两个重要 API：`render`和 `createApp`，并声明了一个 `ComponentPublicInstance`接口。



![img](https://upload-images.jianshu.io/upload_images/10868449-0cf6d28c9791e7d1.png?imageMogr2/auto-orient/strip|imageView2/2/w/640/format/webp)



#### 3、功能概述

- 速度显著提升
- 同时支持 Composition API 和 Options API，以及 typings
- 基于 Proxy 实现的数据变更检测
- 支持 Fragments
  碎片化，不再限于模板中的单个根节点
  render 函数也可以返回数组了，类似实现了 React.Fragments 的功能 ；`Just works`
- 支持 Portals
- 支持 Suspense w/ async setup()
- 服务器端渲染
- <keep-alive>

------

接下来看尤大大怎么更，期待正式版，持续关注~~



![img](https://upload-images.jianshu.io/upload_images/10868449-933fef33b991a3e0.png?imageMogr2/auto-orient/strip|imageView2/2/w/584/format/webp)


#### 转载
https://www.jianshu.com/p/2c7004a86a3e